import re
from documents.utils import process_file
from .models import DocumentChunk
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def split_text(text, max_length=300):
    # Split by paragraphs first
    paragraphs = [p.strip() for p in re.split(r'\n\s*\n', text) if p.strip()]
    chunks = []
    for para in paragraphs:
        # Further split long paragraphs into sentences
        sentences = re.split(r'(?<=[.!?]) +', para)
        current = ""
        for sent in sentences:
            if len(current) + len(sent) < max_length:
                current += sent + " "
            else:
                chunks.append(current.strip())
                current = sent + " "
        if current.strip():
            chunks.append(current.strip())
    return chunks

def chunk_and_store(document):
    raw_text = process_file(document.file.path)
    text_chunks = split_text(raw_text)
    chunk_objs = []
    for idx, chunk in enumerate(text_chunks):
        emb = embedding_model.encode(chunk).tolist()
        obj = DocumentChunk.objects.create(
            document=document,
            chunk_index=idx,
            chunk_text=chunk,
            embedding=emb
        )
        chunk_objs.append(obj)
    return chunk_objs

def build_faiss_index(document):
    chunks = DocumentChunk.objects.filter(document=document).order_by('chunk_index')
    embeddings = [np.array(chunk.embedding, dtype='float32') for chunk in chunks]
    if not embeddings:
        return None, []
    embeddings_np = np.vstack(embeddings)
    index = faiss.IndexFlatL2(embeddings_np.shape[1])
    index.add(embeddings_np)
    return index, list(chunks)