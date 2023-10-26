from rest_framework import serializers
from .models import Task


class TaskSeralizer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('uuid', 'nombre', 'completada')
    
    # def validate_nombre(self, value):
    #     filter_task = Task.objects.filter(nombre=value)
    #     exists = filter_task.exists()
    #     task = filter_task.first()
        
    #     if exists and (self.instance.pk != task.pk):
    #         raise serializers.ValidationError("El nombre ya existe")
    #     return value

class CreateTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('nombre',)

class UpdateTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('nombre', 'completada')
