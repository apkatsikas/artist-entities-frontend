import { useState } from 'react';
import ArtistButton from './ArtistButton';
import ArtistDisplay from './ArtistDisplay';
import { fetchRandomArtist } from '../api';

type ArtistResponse = {
  Name: string;
  Message?: string;
};

function useRandomArtist() {
  const [artist, setArtist] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const getArtist = async () => {
    try {
      const response = await fetchRandomArtist();
      const data: ArtistResponse = await response.json();

      if (response.ok) {
        setArtist(data.Name);
        setErrorMsg('');
      } else {
        setErrorMsg('Failed to get random artist ' + data.Message);
      }
    } catch (error) {
      setErrorMsg('Failed to get random artist: ' + String(error));
    }
  };

  return {
    artist,
    errorMsg,
    getArtist,
  };
}

function ArtistSection() {
  const { artist, errorMsg, getArtist } = useRandomArtist();

  return (
    <>
      <div className="container">
        <div className="top-center">
          <ArtistButton onClick={getArtist} />
          <div id="result-output-get">{errorMsg}</div>
        </div>
      </div>
      <ArtistDisplay artist={artist} />
    </>
  );
}

export default ArtistSection;
