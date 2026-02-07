from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
import bcrypt

from database import create_db_and_tables, get_session
from models import User, UserCreate, UserLogin, TokenResponse
from auth import create_token
from routes.tasks import router as tasks_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(title="Todo API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)


@app.post("/api/auth/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(data: UserCreate, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == data.email)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
        )
    password_hash = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt()).decode()
    user = User(email=data.email, password_hash=password_hash)
    session.add(user)
    session.commit()
    session.refresh(user)
    token = create_token(user.id, user.email)
    return TokenResponse(access_token=token, user_id=user.id)


@app.post("/api/auth/login", response_model=TokenResponse)
def login(data: UserLogin, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == data.email)).first()
    if not user or not bcrypt.checkpw(data.password.encode(), user.password_hash.encode()):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    token = create_token(user.id, user.email)
    return TokenResponse(access_token=token, user_id=user.id)


@app.get("/api/health")
def health():
    return {"status": "ok"}
