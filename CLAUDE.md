# Todo App - Monorepo

## Project Structure
- `console/` - Phase I: Python console todo app
- `backend/` - Phase II: FastAPI backend
- `frontend/` - Phase II: Next.js frontend
- `specs/` - Project specifications
- `.spec-kit/` - Spec-kit configuration

## Commands
- Console app: `py console/src/todo_console/main.py`
- Backend: `cd backend && py -m uvicorn main:app --reload`
- Frontend: `cd frontend && npm run dev`

## Stack
- Python 3.13 (use `py` command)
- Node v20.19.4
- SQLite database
- JWT authentication
