from rest_framework import serializers
from .models import Document

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'user', 'file', 'filename', 'filetype', 'upload_time', 'metadata']
        read_only_fields = ['id', 'user', 'upload_time']