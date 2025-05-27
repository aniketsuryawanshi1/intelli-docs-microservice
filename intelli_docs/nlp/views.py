from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from documents.models import Document
from .models import DocumentChunk
from .serializers import DocumentChunkSerializer
from .utils import chunk_and_store, build_faiss_index
import numpy as np
from sentence_transformers import SentenceTransformer

class ChunkDocumentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, doc_id):
        document = Document.objects.get(id=doc_id, user=request.user)
        chunks = chunk_and_store(document)
        return Response(DocumentChunkSerializer(chunks, many=True).data)

class SearchChunksView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, doc_id):
        query = request.data['query']
        document = Document.objects.get(id=doc_id, user=request.user)
        index, chunks = build_faiss_index(document)
        if index is None:
            return Response({"error": "No chunks found."}, status=400)
        embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        query_emb = embedding_model.encode(query).astype('float32')
        D, I = index.search(np.array([query_emb]), k=5)
        results = [chunks[i].chunk_text for i in I[0]]
        return Response({"results": results})