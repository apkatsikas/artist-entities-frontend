import type { JSX } from 'react';
import { Box, Typography } from '@mui/material';
import ArtistSection from '../artists/components/ArtistSection';
import ArtistEntryForm from '../artists/components/ArtistEntryForm';
import LoginForm from '../auth/components/LoginForm';
import { useArtistSectionViewModel } from '../artists/hooks/useArtistSectionViewModel';
import { useArtistEntryViewModel } from '../artists/hooks/useArtistEntryViewModel';
import { useLoginViewModel } from '../auth/hooks/useLoginViewModel';
import { useAuth } from '../auth/hooks/authContext';

function HomePage(): JSX.Element {
  const { token } = useAuth();
  const artistSectionVM = useArtistSectionViewModel();
  const artistEntryVM = useArtistEntryViewModel();
  const loginVM = useLoginViewModel();

  return (
    <Box component="main">
      <Typography variant="h4" sx={{ textAlign: 'center', pt: '1%' }}>
        New Hell Artist Tracker
      </Typography>
      <ArtistSection
        artist={artistSectionVM.artist}
        errorMsg={artistSectionVM.errorMsg}
        isPending={artistSectionVM.isPending}
        onFetchArtist={artistSectionVM.fetchArtist}
      />
      {token ? (
        <ArtistEntryForm
          artistName={artistEntryVM.artistName}
          onArtistNameChange={artistEntryVM.setArtistName}
          displayMessage={artistEntryVM.displayMessage}
          isError={artistEntryVM.isError}
          isPending={artistEntryVM.isPending}
          onSubmit={artistEntryVM.handleCreate}
        />
      ) : (
        <LoginForm
          username={loginVM.username}
          onUsernameChange={loginVM.setUsername}
          password={loginVM.password}
          onPasswordChange={loginVM.setPassword}
          errorMessage={loginVM.errorMessage}
          isPending={loginVM.isPending}
          onSubmit={loginVM.handleLogin}
        />
      )}
    </Box>
  );
}

export default HomePage;
