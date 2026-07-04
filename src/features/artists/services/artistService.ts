import { fetchRandomArtist, createArtistRequest } from '../api/artistApi';

type ArtistResponse = { Name: string; Message?: string };

export async function getRandomArtist(): Promise<string> {
  const response = await fetchRandomArtist();
  const data: ArtistResponse = await response.json();
  if (!response.ok) {
    throw new Error(data.Message ?? 'Unknown error');
  }
  return data.Name;
}

export async function createArtist(
  name: string,
  token: string
): Promise<string> {
  if (!name) {
    throw new Error('Please enter an artist name');
  }
  const response = await createArtistRequest(name, token);
  const data: ArtistResponse = await response.json();
  if (!response.ok) {
    throw new Error(data.Message ?? 'Unknown error');
  }
  return data.Name;
}
