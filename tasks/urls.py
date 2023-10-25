from django.urls import path
from .views import TaskList, TaskDetail

app_name = "tasks"

urlpatterns = [
    path('tasks', TaskList.as_view(), name='task-list'),
    path('tasks/<uuid:pk>', TaskDetail.as_view(), name='producto-detail'),
]