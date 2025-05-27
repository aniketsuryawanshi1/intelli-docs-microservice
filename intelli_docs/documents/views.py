from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Document
from .serializers import DocumentSerializer

class DocumentUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = request.FILES['file']
        document = Document.objects.create(
            user=request.user,
            file=file,
            filename=file.name,
            filetype=file.content_type,
        )
        return Response(DocumentSerializer(document).data)

class DocumentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        docs = Document.objects.filter(user=request.user)
        return Response(DocumentSerializer(docs, many=True).data)