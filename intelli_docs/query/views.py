from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from documents.models import Document
from .models import QueryLog
from nlp.utils import build_faiss_index
from sentence_transformers import SentenceTransformer
import numpy as np
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load Llama2 model and tokenizer once (at module level)

HF_ACCESS_TOKEN = os.getenv("HF_ACCESS_TOKEN")
print("Hugging Face Access Token:", HF_ACCESS_TOKEN)
llama_model_name = "meta-llama/Llama-2-7b-chat-hf"
llama_tokenizer = AutoTokenizer.from_pretrained(llama_model_name, token=HF_ACCESS_TOKEN)

llama_model = AutoModelForCausalLM.from_pretrained(
    llama_model_name,
    token=HF_ACCESS_TOKEN,
    device_map="auto",
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True
)

class QueryRAGView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, doc_id):
        question = request.data['question']
        print("Received question:", question)
        document = Document.objects.get(id=doc_id, user=request.user)
        index, chunks = build_faiss_index(document)
        if index is None:
            return Response({"error": "No chunks found."}, status=400)
        embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        query_emb = embedding_model.encode(question).astype('float32')
        D, I = index.search(np.array([query_emb]), k=5)
        context = "\n".join([chunks[i].chunk_text for i in I[0]])

        # Call HuggingFace Llama2 to generate the answer
        prompt = f"""<s>[INST] <<SYS>>
You are a helpful assistant. Answer the question based on the following document context.
The context contains textual and tabular data.

Context:
{context}

Question: {question}
Answer:
[/INST]"""

        inputs = llama_tokenizer(prompt, return_tensors="pt").to(llama_model.device)
        outputs = llama_model.generate(
            **inputs,
            max_new_tokens=300,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            pad_token_id=llama_tokenizer.eos_token_id
        )
        answer = llama_tokenizer.decode(outputs[0], skip_special_tokens=True)
        answer = answer.split("Answer:")[-1].strip()

        QueryLog.objects.create(
            user=request.user,
            document=document,
            query_text=question,
            response_text=answer
        )
        return Response({"answer": answer})