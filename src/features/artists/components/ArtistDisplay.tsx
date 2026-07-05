import type { JSX } from 'react';

type ArtistDisplayProps = {
  artist: string | null;
};

function ArtistDisplay({ artist }: ArtistDisplayProps): JSX.Element {
  return (
    <div
      className="artist-display"
      style={{
        minHeight: 'clamp(3rem, 25vw, 15rem)',
      }}
    >
      {artist}
    </div>
  );
}

export default ArtistDisplay;
