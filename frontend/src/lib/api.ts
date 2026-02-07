import { getToken, getUserId } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// Auth
export async function signup(email: string, password: string) {
  return request<{ access_token: string; user_id: number }>(
    "/api/auth/signup",
    { method: "POST", body: JSON.stringify({ email, password }) }
  );
}

export async function login(email: string, password: string) {
  return request<{ access_token: string; user_id: number }>(
    "/api/auth/login",
    { method: "POST", body: JSON.stringify({ email, password }) }
  );
}

// Tasks
export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export async function getTasks(): Promise<Task[]> {
  const userId = getUserId();
  return request<Task[]>(`/api/${userId}/tasks`);
}

export async function createTask(title: string, description: string = ""): Promise<Task> {
  const userId = getUserId();
  return request<Task>(`/api/${userId}/tasks`, {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });
}

export async function updateTask(
  taskId: number,
  data: { title?: string; description?: string }
): Promise<Task> {
  const userId = getUserId();
  return request<Task>(`/api/${userId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteTask(taskId: number): Promise<void> {
  const userId = getUserId();
  return request<void>(`/api/${userId}/tasks/${taskId}`, { method: "DELETE" });
}

export async function toggleComplete(taskId: number): Promise<Task> {
  const userId = getUserId();
  return request<Task>(`/api/${userId}/tasks/${taskId}/complete`, {
    method: "PATCH",
  });
}
