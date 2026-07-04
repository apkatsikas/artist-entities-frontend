import React from 'react';

type ArtistEntryFormProps = {
  artistName: string;
  onArtistNameChange: (value: string) => void;
  displayMessage: string | null;
  isError: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

function ArtistEntryForm({
  artistName,
  onArtistNameChange,
  displayMessage,
  isError,
  onSubmit,
}: ArtistEntryFormProps) {
  return (
    <form
      id="artist-entry-container"
      className="btm-container"
      onSubmit={onSubmit}
    >
      <div className="top-btm-padding">
        <label className="white-text" htmlFor="artist-entry">
          Enter artist:
        </label>
        <input
          type="text"
          id="artist-entry"
          value={artistName}
          onChange={(e) => onArtistNameChange(e.target.value)}
          autoFocus
        />
      </div>

      <button className="ak-button create-btn" type="submit">
        Create Artist
      </button>

      {displayMessage && (
        <div
          id="result-output"
          className={isError ? 'error-msg' : 'white-text'}
        >
          {displayMessage}
        </div>
      )}
    </form>
  );
}

export default ArtistEntryForm;
