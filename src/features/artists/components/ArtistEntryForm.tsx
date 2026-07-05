import type { JSX, FormEvent } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import FormContainer from '../../shared/components/FormContainer';
import { sxPresets } from '../../shared/constants/theme';

type ArtistEntryFormProps = {
  artistName: string;
  onArtistNameChange: (value: string) => void;
  displayMessage: string | null;
  isError: boolean;
  onSubmit: (e: FormEvent) => void;
};

function ArtistEntryForm({
  artistName,
  onArtistNameChange,
  displayMessage,
  isError,
  onSubmit,
}: ArtistEntryFormProps): JSX.Element {
  return (
    <FormContainer onSubmit={onSubmit}>
      <TextField
        label="Enter artist"
        value={artistName}
        onChange={(e) => onArtistNameChange(e.target.value)}
        autoFocus
        fullWidth
      />
      <Button variant="contained" type="submit" fullWidth>
        Create Artist
      </Button>
      {displayMessage && (
        <Typography
          color={isError ? 'error' : 'inherit'}
          sx={sxPresets.formFeedback}
        >
          {displayMessage}
        </Typography>
      )}
    </FormContainer>
  );
}

export default ArtistEntryForm;
