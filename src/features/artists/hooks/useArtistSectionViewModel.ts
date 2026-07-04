import { useState } from 'react';
import { getRandomArtist } from '../services/artistService';

export function useArtistSectionViewModel() {
  const [artist, setArtist] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchArtist = async () => {
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
