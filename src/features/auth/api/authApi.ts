const API_BASE = import.meta.env.VITE_API_BASE_URL;

type LoginPayload = {
  userName: string;
  password: string;
};

export function loginRequest(payload: LoginPayload): Promise<Response> {
  return fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
