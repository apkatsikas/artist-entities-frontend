type ArtistButtonProps = {
  onClick: () => Promise<void>;
};

function ArtistButton({ onClick }: ArtistButtonProps) {
  return (
    <div>
      <button className="ak-button" onClick={onClick}>
        Random Artist
      </button>
    </div>
  );
}

export default ArtistButton;
