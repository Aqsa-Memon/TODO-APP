from todo_console.models import Task


class TaskStore:
    def __init__(self) -> None:
        self._tasks: dict[int, Task] = {}
        self._next_id: int = 1

    def add_task(self, title: str, description: str = "") -> Task:
        task = Task(id=self._next_id, title=title, description=description)
        self._tasks[task.id] = task
        self._next_id += 1
        return task

    def delete_task(self, task_id: int) -> bool:
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False

    def update_task(
        self, task_id: int, title: str | None = None, description: str | None = None
    ) -> Task | None:
        task = self._tasks.get(task_id)
        if task is None:
            return None
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        return task

    def get_all_tasks(self) -> list[Task]:
        return list(self._tasks.values())

    def toggle_complete(self, task_id: int) -> Task | None:
        task = self._tasks.get(task_id)
        if task is None:
            return None
        task.completed = not task.completed
        return task
