# Database Schema

## Users Table
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| email | TEXT | Unique, indexed |
| password_hash | TEXT | bcrypt hash |
| created_at | DATETIME | Default: now |

## Tasks Table
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| user_id | INTEGER | Indexed, references users.id |
| title | TEXT | Required |
| description | TEXT | Default: "" |
| completed | BOOLEAN | Default: false |
| created_at | DATETIME | Default: now |
| updated_at | DATETIME | Default: now |
