
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from .models import Task
from .serializer import TaskSeralizer
from .utils import TaskStatus

class TaskList(APIView):
    
    def get(self, request):
        status_param = request.GET.get('status')
        if not status_param or status_param == TaskStatus.ALL.value:
            tasks = Task.objects.all()
        elif status_param == TaskStatus.COMPLETED.value:
            tasks = Task.objects.filter(completada=True)
        else:
            tasks = Task.objects.filter(completada=False)
        serializer = TaskSeralizer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TaskSeralizer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class TaskDetail(APIView):
    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound(f'Task with id {pk} not found')

    def get(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskSeralizer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskSeralizer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
