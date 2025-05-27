from django.urls import path
from .views import ChunkDocumentView, SearchChunksView

urlpatterns = [
    path('chunk/<int:doc_id>/', ChunkDocumentView.as_view(), name='chunk-document'),
    path('search/<int:doc_id>/', SearchChunksView.as_view(), name='search-chunks'),
]