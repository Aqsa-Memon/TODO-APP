# Architecture

## Phase I - Console App
- Single Python package (`todo_console`)
- In-memory dict-based task store
- Rich library for formatted CLI output
- Entry point: `console/src/todo_console/main.py`

## Phase II - Web App

### Frontend (Next.js)
- App Router with client-side pages
- Auth pages: `/login`, `/signup`
- Task dashboard: `/tasks`
- API client in `src/lib/api.ts`
- JWT stored in localStorage

### Backend (FastAPI)
- SQLModel ORM with SQLite
- JWT authentication (bcrypt + PyJWT)
- RESTful task CRUD under `/api/{user_id}/tasks`
- Auth endpoints: `/api/auth/signup`, `/api/auth/login`
- CORS enabled for `localhost:3000`
