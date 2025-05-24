from django.db import models
from django.conf import settings

class Document(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="documents"
    )
    file = models.FileField(upload_to="uploads/")
    filename = models.CharField(max_length=255)
    filetype = models.CharField(max_length=50)
    upload_time = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.filename} ({self.user.username})"