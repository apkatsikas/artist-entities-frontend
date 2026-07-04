import ArtistButton from './ArtistButton';
import ArtistDisplay from './ArtistDisplay';

type ArtistSectionProps = {
  artist: string;
  errorMsg: string;
  onFetchArtist: () => Promise<void>;
};

function ArtistSection({ artist, errorMsg, onFetchArtist }: ArtistSectionProps) {
  return (
    <>
      <div className="container">
        <div className="top-center">
          <ArtistButton onClick={onFetchArtist} />
          <div id="result-output-get">{errorMsg}</div>
        </div>
      </div>
      <ArtistDisplay artist={artist} />
    </>
  );
}

export default ArtistSection;
