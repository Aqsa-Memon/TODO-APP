# REST API Endpoints

## Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Create new user |
| POST | `/api/auth/login` | Login, get JWT |

## Tasks (all require JWT)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/{user_id}/tasks` | List all tasks |
| POST | `/api/{user_id}/tasks` | Create task |
| GET | `/api/{user_id}/tasks/{id}` | Get single task |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle complete |

## Health
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
