import type { JSX } from 'react';

type ArtistButtonProps = {
  onClick: () => Promise<void>;
};

function ArtistButton({ onClick }: ArtistButtonProps): JSX.Element {
  return (
    <div>
      <button className="ak-button" onClick={onClick}>
        Random Artist
      </button>
    </div>
  );
}

export default ArtistButton;
