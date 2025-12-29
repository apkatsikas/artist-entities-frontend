type ArtistDisplayProps = {
  artist: string | null;
};

function ArtistDisplay({ artist }: ArtistDisplayProps) {
  return (
    <div className="horiz-center white-text" id="artist">
      {artist}
    </div>
  );
}

export default ArtistDisplay;
