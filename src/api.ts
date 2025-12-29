const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchRandomArtist() {
  return fetch(`${API_BASE}/artist/random`);
}

type LoginPayload = {
  userName: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<Response> {
  return fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function createArtist(
  name: string,
  token: string
): Promise<Response> {
  return await fetch(`${API_BASE}/artist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ Name: name }),
  });
}
