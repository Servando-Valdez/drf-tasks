from enum import Enum

class TaskStatus(Enum):
    ALL = 'all'
    COMPLETED = 'completed'
    PENDING = 'pending'

from rest_framework import schemas

class CustomCreateTaskSchema(schemas.AutoSchema):
    def get_operation(self, view):
        operation = super().get_operation(view)

        # Define los campos esperados en la solicitud POST
        request_body = {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Título de la tarea."
                },
            },
            "required": ["name"]  # Indica que el campo "title" es obligatorio
        }

        operation['requestBody'] = {
            "content": {
                "application/json": {
                    "schema": request_body
                }
            }
        }

        return operation





