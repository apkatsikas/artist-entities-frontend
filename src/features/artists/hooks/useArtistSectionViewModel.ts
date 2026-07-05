import { useMutation } from '@tanstack/react-query';
import { getRandomArtist } from '../services/artistService';

type ArtistSectionViewModel = {
  artist: string;
  errorMsg: string;
  isPending: boolean;
  fetchArtist: () => void;
};

export function useArtistSectionViewModel(): ArtistSectionViewModel {
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: getRandomArtist,
  });

  const artist = data ?? '';
  const errorMsg = error
    ? `Failed to get random artist ${error instanceof Error ? error.message : String(error)}`
    : '';

  return { artist, errorMsg, isPending, fetchArtist: mutate };
}
