from django.db import models

# Create your models here.
from django.db import models
from safedelete.models import SafeDeleteModel
import uuid
# Create your models here.
class AbstractModel(SafeDeleteModel):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
class Task(AbstractModel):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, null=False, blank=False)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name