import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

import ArtistSection from '../components/ArtistSection';

describe('ArtistSection', () => {
  it('fetches and displays a random artist on success', async () => {
    render(<ArtistSection />);

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

    render(<ArtistSection />);

    await userEvent.click(
      screen.getByRole('button', { name: /random artist/i })
    );

    expect(
      await screen.findByText(/Failed to get random artist Database down/i)
    ).toBeInTheDocument();
  });
});
