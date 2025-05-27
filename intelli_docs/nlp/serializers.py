from rest_framework import serializers
from .models import DocumentChunk

class DocumentChunkSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentChunk
        fields = ['id', 'document', 'chunk_index', 'chunk_text', 'embedding', 'created_at']
        read_only_fields = ['id', 'created_at']