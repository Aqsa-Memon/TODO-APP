# Backend - FastAPI

## Setup
```bash
cd backend && pip install fastapi uvicorn sqlmodel pyjwt python-dotenv bcrypt
```

## Development
```bash
cd backend && py -m uvicorn main:app --reload   # http://localhost:8000
```

## API Docs
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Structure
- `main.py` - App entry point, auth endpoints, CORS config
- `models.py` - SQLModel tables (User, Task) and request/response schemas
- `database.py` - SQLite engine and session management
- `auth.py` - JWT token creation and verification
- `routes/tasks.py` - Task CRUD endpoints

## Environment
- `DATABASE_URL` - Database connection string (default: sqlite:///./todo.db)
- `JWT_SECRET` - Secret key for JWT signing
