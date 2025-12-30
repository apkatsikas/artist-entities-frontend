type ArtistDisplayProps = {
  artist: string | null;
};

function ArtistDisplay({ artist }: ArtistDisplayProps) {
  return (
    <div
      className="horiz-center white-text"
      id="artist"
      style={{
        minHeight: 'clamp(3rem, 25vw, 15rem)',
      }}
    >
      {artist}
    </div>
  );
}

export default ArtistDisplay;
