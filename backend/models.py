from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.now)


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)
    title: str
    description: str = ""
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


# --- Request/Response schemas ---

class UserCreate(SQLModel):
    email: str
    password: str


class UserLogin(SQLModel):
    email: str
    password: str


class TokenResponse(SQLModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int


class TaskCreate(SQLModel):
    title: str
    description: str = ""


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None


class TaskRead(SQLModel):
    id: int
    user_id: int
    title: str
    description: str
    completed: bool
    created_at: datetime
    updated_at: datetime
