from rest_framework import serializers
from .models import Task


class TaskSeralizer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('uuid', 'name', 'completed')

class CreateTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('name',)

class UpdateTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('name', 'completed')
