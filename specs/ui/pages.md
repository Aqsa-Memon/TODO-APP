# UI Pages

## `/` - Landing
- Redirects to `/tasks` if logged in, `/login` if not

## `/login` - Login
- Email + password form
- Link to signup page
- On success: redirect to `/tasks`

## `/signup` - Sign Up
- Email + password form
- Link to login page
- On success: redirect to `/tasks`

## `/tasks` - Task Dashboard
- Header with app title and logout button
- Add task form (title + description)
- Task list with checkbox, edit, and delete buttons
- Edit modal for updating task details
- Protected: redirects to `/login` if not authenticated
