from django.db import models
from django.conf import settings
from documents.models import Document

class QueryLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="queries"
    )
    document = models.ForeignKey(
        Document, on_delete=models.SET_NULL, null=True, blank=True, related_name="queries"
    )
    query_text = models.TextField()
    response_text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query by {self.user.username} on {self.created_at.strftime('%Y-%m-%d %H:%M')}"