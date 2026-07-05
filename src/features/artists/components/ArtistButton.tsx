import type { JSX } from 'react';
import { Button } from '@mui/material';

type ArtistButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

function ArtistButton({ onClick, disabled }: ArtistButtonProps): JSX.Element {
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled}>
      Random Artist
    </Button>
  );
}

export default ArtistButton;
