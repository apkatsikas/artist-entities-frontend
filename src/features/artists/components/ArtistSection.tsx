import type { JSX } from 'react';
import { Box, Typography } from '@mui/material';
import ArtistButton from './ArtistButton';
import ArtistDisplay from './ArtistDisplay';
import { sxPresets } from '../../shared/constants/theme';

type ArtistSectionProps = {
  artist: string;
  errorMsg: string;
  onFetchArtist: () => Promise<void>;
};

function ArtistSection({
  artist,
  errorMsg,
  onFetchArtist,
}: ArtistSectionProps): JSX.Element {
  return (
    <>
      <Box sx={sxPresets.sectionLayout}>
        <ArtistButton onClick={onFetchArtist} />
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
