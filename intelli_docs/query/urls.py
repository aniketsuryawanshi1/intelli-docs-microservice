from django.urls import path
from .views import QueryRAGView

urlpatterns = [
    path('rag/<int:doc_id>/', QueryRAGView.as_view(), name='query-rag'),
]