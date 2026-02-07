# Feature: Authentication

## Approach
- Custom JWT authentication (no third-party auth service)
- bcrypt password hashing
- 24-hour token expiration

## Endpoints
- `POST /api/auth/signup` - Create account, return JWT
- `POST /api/auth/login` - Authenticate, return JWT

## Frontend Flow
1. User visits `/login` or `/signup`
2. On success, JWT + user_id stored in localStorage
3. All API requests include `Authorization: Bearer <token>` header
4. Logout clears localStorage and redirects to `/login`
