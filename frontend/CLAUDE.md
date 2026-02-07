# Frontend - Next.js

## Setup
```bash
cd frontend && npm install
```

## Development
```bash
npm run dev    # http://localhost:3000
npm run build  # Production build
```

## Structure
- `src/app/` - App Router pages (login, signup, tasks)
- `src/components/` - React components (TaskList, TaskItem, AddTaskForm, EditTaskModal, AuthForm)
- `src/lib/api.ts` - Backend API client
- `src/lib/auth.ts` - Auth helpers (localStorage JWT management)

## Environment
- `NEXT_PUBLIC_API_URL` - Backend URL (default: http://localhost:8000)
