import type { JSX } from 'react';
import { Typography } from '@mui/material';
import { sxPresets } from '../../shared/constants/theme';

type ArtistDisplayProps = {
  artist: string | null;
};

function ArtistDisplay({ artist }: ArtistDisplayProps): JSX.Element {
  return <Typography sx={sxPresets.artistDisplay}>{artist}</Typography>;
}

export default ArtistDisplay;
