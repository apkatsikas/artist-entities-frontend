import type { JSX } from 'react';
import { Box, Typography } from '@mui/material';
import ArtistButton from './ArtistButton';
import ArtistDisplay from './ArtistDisplay';
import { sxPresets } from '../../shared/constants/theme';

type ArtistSectionProps = {
  artist: string;
  errorMsg: string;
  isPending: boolean;
  onFetchArtist: () => void;
};

function ArtistSection({
  artist,
  errorMsg,
  isPending,
  onFetchArtist,
}: ArtistSectionProps): JSX.Element {
  return (
    <>
      <Box sx={sxPresets.sectionLayout}>
        <ArtistButton onClick={onFetchArtist} disabled={isPending} />
        {errorMsg && (
          <Typography color="error" sx={sxPresets.sectionError}>
            {errorMsg}
          </Typography>
        )}
      </Box>
      <ArtistDisplay artist={artist} />
    </>
  );
}

export default ArtistSection;
