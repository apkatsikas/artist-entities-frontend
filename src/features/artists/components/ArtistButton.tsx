import type { JSX } from 'react';
import { Button } from '@mui/material';

type ArtistButtonProps = {
  onClick: () => Promise<void>;
};

function ArtistButton({ onClick }: ArtistButtonProps): JSX.Element {
  return (
    <Button variant="contained" onClick={onClick}>
      Random Artist
    </Button>
  );
}

export default ArtistButton;
