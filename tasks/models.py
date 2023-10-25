from django.db import models

# Create your models here.
from django.db import models
from safedelete import SOFT_DELETE_CASCADE
from safedelete.models import SafeDeleteModel
import uuid
# Create your models here.
class AbstractModel(SafeDeleteModel):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
class Task(AbstractModel):
    _safedelete_policy__ = SOFT_DELETE_CASCADE
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    completada = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre