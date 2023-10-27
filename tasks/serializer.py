from rest_framework import serializers
from .models import Task


class TaskSeralizer(serializers.ModelSerializer):
    """
    Serializer for the task (Task).

    Fields:
    - uuid: The unique identifier of the task.
    - name: The name of the task.
    - completed: Indicates whether the task is completed or not.

    This serializer is used to convert task model objects into JSON format and vice versa.
    """
    class Meta:
        model = Task
        fields = ('uuid', 'name', 'completed')

class CreateTaskSerializer(serializers.ModelSerializer):
    """
    Serializer for task creation.

    Fields:
    - name: The name of the task (required field).

    This serializer is used to create new tasks. A JSON object with the 'name' field is expected.
    """
    class Meta:
        model = Task
        fields = ('name',)
    
    def validate_name(self, value):
        """
        Validates the name of the task.

        Parameters:
        - value: The name of the task.

        Returns:
        - The name of the task if it is valid.

        Raises:
        - serializers.ValidationError if the name is not valid.
        """
        if ExistName(value):
            raise serializers.ValidationError("Task with this name already exists.")
        return value

class UpdateTaskSerializer(serializers.ModelSerializer):
    """
    Serializer for task update.

    Fields:
    - name: The name of the task (required field).
    - completed: Indicates whether the task is completed or not (optional field).

    This serializer is used to update existing tasks. JSON objects with 'name' and/or 'completed' fields are expected.
    """
    class Meta:
        model = Task
        fields = ('name', 'completed')

    def validate_name(self, value):
        task = ExistName(value)
        if task:
            if self.instance.pk != task.pk:
                raise serializers.ValidationError("Task with this name already exists.")
        return value


def ExistName(name):
    """
    Checks whether a task with the given name exists.

    Parameters:
    - name: The name of the task.

    Returns:
    - task with the given name exists.
    - None otherwise.
    """
    try:
        task = Task.objects.get(name=name)
        return task
    except Task.DoesNotExist:
        return None