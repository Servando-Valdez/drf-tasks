from django.db import models

# Create your models here.
from django.db import models
from safedelete.models import SafeDeleteModel
import uuid
# Create your models here.
class AbstractModel(SafeDeleteModel):
    """
    Abstract class for models with safe delete functionality (Safe Delete).

    Attributes:
    - created_at: The creation date and time of the model.

    This abstract class is used as a base for other models and provides safe delete functionality.
    The 'created_at' attribute records the date and time the model was created.
    """

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
class Task(AbstractModel):
    """
    Model to represent tasks.

    Attributes:
    - uuid: Unique identifier of the task.
    - name: Name of the task.
    - completed: Indicates whether the task is completed or not.

    Methods:
    - __str__: Returns the task name as a string representation.

    This model represents a task and inherits from 'AbstractModel'.
    The 'uuid' attribute is used as the primary key and is an automatically generated unique identifier.
    'name' stores the name of the task and 'completed' indicates whether the task is completed or not.
    """
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, null=False, blank=False)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name