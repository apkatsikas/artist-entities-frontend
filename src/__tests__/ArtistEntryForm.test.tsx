import type { JSX } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArtistEntryForm from '../features/artists/components/ArtistEntryForm';
import { useArtistEntryViewModel } from '../features/artists/hooks/useArtistEntryViewModel';
import { MockAuthProvider } from './mocks/MockAuthProvider';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

function ArtistEntryFormWithViewModel(): JSX.Element {
  const vm = useArtistEntryViewModel();
  return (
    <ArtistEntryForm
      artistName={vm.artistName}
      onArtistNameChange={vm.setArtistName}
      displayMessage={vm.displayMessage}
      isError={vm.isError}
      onSubmit={vm.handleCreate}
    />
  );
}

describe('ArtistEntryForm', () => {
  it('submits a new artist and shows success message', async () => {
    render(
      <MockAuthProvider token="FAKE_JWT">
        <ArtistEntryFormWithViewModel />
      </MockAuthProvider>
    );

    const input = screen.getByLabelText(/Enter artist/i);
    const button = screen.getByRole('button', { name: /Create Artist/i });

    await userEvent.type(input, 'New Artist');
    await userEvent.click(button);

    const result = await screen.findByText(/Created artist: New Artist/i);
    expect(result).toBeInTheDocument();
  });

  it('shows server error when artist creation fails', async () => {
    server.use(
      http.post('/artist', () => {
        return HttpResponse.json(
          { Message: 'Internal server error' },
          { status: 500 }
        );
      })
    );

    render(
      <MockAuthProvider token="FAKE_JWT">
        <ArtistEntryFormWithViewModel />
      </MockAuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/Enter artist/i), 'New Artist');
    await userEvent.click(
      screen.getByRole('button', { name: /Create Artist/i })
    );

    expect(
      await screen.findByText(/Failed to create artist/i)
    ).toBeInTheDocument();
  });

  it('shows error if artist name is empty', async () => {
    render(
      <MockAuthProvider token="FAKE_JWT">
        <ArtistEntryFormWithViewModel />
      </MockAuthProvider>
    );

    const button = screen.getByRole('button', { name: /Create Artist/i });
    await userEvent.click(button);

    const result = await screen.findByText(/Please enter an artist name/i);
    expect(result).toBeInTheDocument();
  });
});
