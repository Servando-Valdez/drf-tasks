from django.urls import path
from .views import TaskList

app_name = "tasks"

urlpatterns = [
    path('tasks', TaskList.as_view(), name='task-list'),
]