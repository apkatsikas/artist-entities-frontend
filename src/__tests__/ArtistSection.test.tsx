import type { JSX } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

import ArtistSection from '../features/artists/components/ArtistSection';
import { useArtistSectionViewModel } from '../features/artists/hooks/useArtistSectionViewModel';

function ArtistSectionWithViewModel(): JSX.Element {
  const vm = useArtistSectionViewModel();
  return (
    <ArtistSection
      artist={vm.artist}
      errorMsg={vm.errorMsg}
      onFetchArtist={vm.fetchArtist}
    />
  );
}

describe('ArtistSection', () => {
  it('fetches and displays a random artist on success', async () => {
    render(<ArtistSectionWithViewModel />);

    await userEvent.click(
      screen.getByRole('button', { name: /random artist/i })
    );

    expect(await screen.findByText('cool band')).toBeInTheDocument();
  });

  it('shows error message on 5xx failure', async () => {
    server.use(
      http.get('/artist/random', () => {
        return HttpResponse.json({ Message: 'Database down' }, { status: 500 });
      })
    );

    render(<ArtistSectionWithViewModel />);

    await userEvent.click(
      screen.getByRole('button', { name: /random artist/i })
    );

    expect(
      await screen.findByText(/Failed to get random artist Database down/i)
    ).toBeInTheDocument();
  });
});
