import { useState } from 'react';
import { createArtist } from '../api';
import { useAuth } from '../authContext';

type CreateArtistResponse = {
  Name: string;
  Message?: string;
};

type Result = { data: CreateArtistResponse; success: boolean } | null;

function ArtistEntryForm() {
  const [artist, setArtist] = useState('');
  const [result, setResult] = useState<Result>(null);
  const { token } = useAuth();

  const handleCreate = async () => {
    if (!artist) {
      setResult({
        data: { Name: '', Message: 'Please enter an artist name' },
        success: false,
      });
      return;
    }
    if (!token) {
      setResult({
        data: {
          Name: '',
          Message: 'You must be logged in to create an artist',
        },
        success: false,
      });
      return;
    }

    try {
      const response = await createArtist(artist, token);
      const data: CreateArtistResponse = await response.json();

      setResult(
        response.ok ? { data, success: true } : { data, success: false }
      );

      if (response.ok) setArtist('');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setResult({ data: { Name: '', Message: message }, success: false });
      setArtist('');
    }
  };

  return (
    <div id="artist-entry-container" className="btm-container">
      <div className="top-btm-padding">
        <label className="white-text" htmlFor="artist-entry">
          Enter artist:
        </label>
        <input
          size={75}
          type="text"
          id="artist-entry"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>

      <button className="ak-button create-btn" onClick={handleCreate}>
        Create Artist
      </button>

      {result && (
        <div
          id="result-output"
          className={result.success ? 'white-text' : 'error-msg'}
        >
          {result.success
            ? `Created artist: ${result.data.Name}`
            : `Failed to create artist: ${result.data.Message}`}
        </div>
      )}
    </div>
  );
}

export default ArtistEntryForm;
