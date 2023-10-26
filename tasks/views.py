
# Create your views here.
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from drf_yasg import openapi
from .models import Task
from .serializer import TaskSeralizer, CreateTaskSerializer, UpdateTaskSerializer
from .utils import TaskStatus

class TaskList(APIView):
    """
    View for listing and creating tasks.

    Supported methods:
    - GET: Returns a list of tasks.
    - POST: Creates a new task.

    Parameters:
    - `status` (optional): Filters tasks by status (completed or not).

    Responses:
    - 200 OK: Returns the task list.
    - 201 Created: When a new task is created.
    - 400 Bad Request: If the POST request is invalid.


    Example GET request:
    /tasks?status=all
    /tasks?status=completed
    /tasks?status=pending
    """
    @swagger_auto_schema(
        responses={status.HTTP_200_OK: 'Get tasks successfully'},
        operation_description='Get a list of tasks',
        manual_parameters=[
            openapi.Parameter(
                name="status",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Filter tasks by status (all, completed, pending).",
                enum=[TaskStatus.ALL.value, TaskStatus.COMPLETED.value, TaskStatus.PENDING.value],
                required=False  # Set to True if you want it to be a required parameter
            )
        ],
        operation_summary='Get a list of tasks'
    )
    def get(self, request):
        """
        Gets a list of tasks according to the 'status' parameter.

        Example GET request:
        /tasks?status=all
        """
        status_param = request.GET.get('status')
        if not status_param or status_param == TaskStatus.ALL.value:
            tasks = Task.objects.all()
        elif status_param == TaskStatus.COMPLETED.value:
            tasks = Task.objects.filter(completed=True)
        else:
            tasks = Task.objects.filter(completed=False)
        serializer = TaskSeralizer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=CreateTaskSerializer,
        responses={status.HTTP_201_CREATED: 'Task created successfully'},
        operation_description='Create a new task',
        operation_summary='Create a new task'
    )
    def post(self, request):
        """
        Creates a new task.

        Example POST request:
        { "name": "New task"}
        """
        crate_serializer = CreateTaskSerializer(data=request.data)
        if crate_serializer.is_valid():
            task = crate_serializer.save()
            task_serializer = TaskSeralizer(task)
            return Response(task_serializer.data, status=status.HTTP_201_CREATED)
        return Response(crate_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class TaskDetail(APIView):
    """
    View to view, update and delete individual tasks.

    Supported methods:
    - GET: Returns the details of a task.
    - PUT: Updates an existing task.
    - DELETE: Deletes a task.

    Responses:
    - 200 OK: Returns the details of the task and when updating a task.
    - 204 No Content: When a task is successfully deleted.
    - 400 Bad Request: If the PUT request is invalid.
    - 404 Not Found: If the task is not found.

    Example GET request:
    /tasks/{task_id}/
    """

    def get_object(self, pk):
        """
        Gets a task by its identifier (pk).

        Example usage:
        task = self.get_object(pk).
        """
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound(f'Task with id {pk} not found')

    @swagger_auto_schema(
        responses={status.HTTP_200_OK: 'Get task successfully'},
        operation_description='Gets a task detail by uuid',
        operation_summary='Gets a task detail by uuid',
    )
    def get(self, request, pk):
        """
        Gets the details of a task.

        Example GET request:
        /tasks/{task_id}
        """
        task = self.get_object(pk)
        serializer = TaskSeralizer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=UpdateTaskSerializer,
        responses={status.HTTP_200_OK: 'Task created successfully'},
        operation_description='Update a task by uuid',
        operation_summary='Update a task by uuid'
    )
    def put(self, request, pk):
        """
        Updates an existing task.

        Example PUT request:
        /tasks/{task_id}
        { "name": "New task updated", "completed": true}
        """
        task = self.get_object(pk)
        update_serializer = UpdateTaskSerializer(task, data=request.data)
        if update_serializer.is_valid():
            task = update_serializer.save()
            task_serializer = TaskSeralizer(task)
            return Response(task_serializer.data, status=status.HTTP_200_OK)
        return Response(update_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={status.HTTP_204_NO_CONTENT: 'Task deleted successfully'},
        operation_description='deletes a task by uuid',
        operation_summary='deletes a task by uuid'
    )
    def delete(self, request, pk):
        """
        Deletes a task.

        DELETE request example:
        /tasks/{task_id}/
        """
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
