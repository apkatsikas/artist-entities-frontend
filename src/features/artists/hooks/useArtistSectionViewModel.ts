import { useState } from 'react';
import { getRandomArtist } from '../services/artistService';

type ArtistSectionViewModel = {
  artist: string;
  errorMsg: string;
  fetchArtist: () => Promise<void>;
};

export function useArtistSectionViewModel(): ArtistSectionViewModel {
  const [artist, setArtist] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchArtist = async (): Promise<void> => {
    try {
      const name = await getRandomArtist();
      setArtist(name);
      setErrorMsg('');
    } catch (error) {
      setErrorMsg(
        'Failed to get random artist ' +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  return { artist, errorMsg, fetchArtist };
}
