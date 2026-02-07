const TOKEN_KEY = "todo_token";
const USER_ID_KEY = "todo_user_id";

export function saveAuth(token: string, userId: number) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, String(userId));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserId(): number | null {
  const id = localStorage.getItem(USER_ID_KEY);
  return id ? Number(id) : null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken() && !!getUserId();
}
