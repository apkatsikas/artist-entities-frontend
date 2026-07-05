const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function fetchRandomArtist(): Promise<Response> {
  return fetch(`${API_BASE}/artist/random`);
}

export function createArtistRequest(
  name: string,
  token: string
): Promise<Response> {
  return fetch(`${API_BASE}/artist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ Name: name }),
  });
}
