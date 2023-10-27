from enum import Enum

class TaskStatus(Enum):
    """
    This class defines an enumeration for task status.

    The `TaskStatus` enumeration consists of the following values:
    - `ALL`: Represents all task.
    - `COMPLETED`: Represents completed tasks.
    - `PENDING`: Represents pending tasks.
    """
    ALL = 'all'
    COMPLETED = 'completed'
    PENDING = 'pending'




