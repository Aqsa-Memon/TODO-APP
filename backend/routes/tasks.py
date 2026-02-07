from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from database import get_session
from models import Task, TaskCreate, TaskRead, TaskUpdate
from auth import verify_token

router = APIRouter(prefix="/api", tags=["tasks"])


@router.get("/{user_id}/tasks", response_model=list[TaskRead])
def get_tasks(
    user_id: int,
    current_user: int = Depends(verify_token),
    session: Session = Depends(get_session),
):
    if current_user != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    tasks = session.exec(select(Task).where(Task.user_id == user_id)).all()
    return tasks


@router.post("/{user_id}/tasks", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: int,
    data: TaskCreate,
    current_user: int = Depends(verify_token),
    session: Session = Depends(get_session),
):
    if current_user != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    task = Task(user_id=user_id, title=data.title, description=data.description)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.get("/{user_id}/tasks/{task_id}", response_model=TaskRead)
def get_task(
    user_id: int,
    task_id: int,
    current_user: int = Depends(verify_token),
    session: Session = Depends(get_session),
):
    if current_user != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.put("/{user_id}/tasks/{task_id}", response_model=TaskRead)
def update_task(
    user_id: int,
    task_id: int,
    data: TaskUpdate,
    current_user: int = Depends(verify_token),
    session: Session = Depends(get_session),
):
    if current_user != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    if data.title is not None:
        task.title = data.title
    if data.description is not None:
        task.description = data.description
    task.updated_at = datetime.now()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.delete("/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    user_id: int,
    task_id: int,
    current_user: int = Depends(verify_token),
    session: Session = Depends(get_session),
):
    if current_user != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    session.delete(task)
    session.commit()


@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskRead)
def toggle_complete(
    user_id: int,
    task_id: int,
    current_user: int = Depends(verify_token),
    session: Session = Depends(get_session),
):
    if current_user != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    task.completed = not task.completed
    task.updated_at = datetime.now()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
