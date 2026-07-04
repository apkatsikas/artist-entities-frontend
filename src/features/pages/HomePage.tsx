import type { JSX } from 'react';
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
    <main>
      <h1>New Hell Artist Tracker</h1>
      <ArtistSection
        artist={artistSectionVM.artist}
        errorMsg={artistSectionVM.errorMsg}
        onFetchArtist={artistSectionVM.fetchArtist}
      />
      {token ? (
        <ArtistEntryForm
          artistName={artistEntryVM.artistName}
          onArtistNameChange={artistEntryVM.setArtistName}
          displayMessage={artistEntryVM.displayMessage}
          isError={artistEntryVM.isError}
          onSubmit={artistEntryVM.handleCreate}
        />
      ) : (
        <LoginForm
          username={loginVM.username}
          onUsernameChange={loginVM.setUsername}
          password={loginVM.password}
          onPasswordChange={loginVM.setPassword}
          errorMessage={loginVM.errorMessage}
          onSubmit={loginVM.handleLogin}
        />
      )}
    </main>
  );
}

export default HomePage;
