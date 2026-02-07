# Evolution of Todo - Hackathon Project

A full-stack todo application demonstrating the evolution from a console app to a web app.

## Phase I: Console App

Python CLI todo application with rich formatting.

```bash
pip install rich
py console/src/todo_console/main.py
```

Features: Add, view, update, toggle complete, and delete tasks via an interactive menu.

## Phase II: Full-Stack Web App

### Backend (FastAPI)

```bash
cd backend
pip install fastapi uvicorn sqlmodel pyjwt python-dotenv bcrypt
py -m uvicorn main:app --reload
```

API available at http://localhost:8000 (Swagger docs at `/docs`).

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

UI available at http://localhost:3000.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Console | Python 3.13, rich |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | FastAPI, SQLModel, SQLite |
| Auth | JWT (bcrypt + PyJWT) |

## Project Structure

```
├── console/       # Phase I - Console todo app
├── backend/       # Phase II - FastAPI REST API
├── frontend/      # Phase II - Next.js web UI
├── specs/         # Project specifications
└── .spec-kit/     # Spec-kit configuration
```
