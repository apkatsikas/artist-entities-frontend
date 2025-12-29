import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';
import { AuthProvider } from '../components/AuthProvider';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('App authenticated flow', () => {
  it('allows user to login and create an artist', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/username/i), 'alice');

    await userEvent.type(screen.getByLabelText(/password/i), 'password');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    const artistInput = await screen.findByLabelText(/enter artist/i);
    expect(artistInput).toBeInTheDocument();

    await userEvent.type(artistInput, 'cool band');
    await userEvent.click(
      screen.getByRole('button', { name: /create artist/i })
    );
    const success = await screen.findByText(/created artist: cool band/i);
    expect(success).toBeInTheDocument();
  });
});

describe('App login failure flow', () => {
  it('does not show artist entry form when login fails', async () => {
    server.use(
      http.post('/login', async () => {
        return HttpResponse.json(
          { Message: 'Invalid credentials' },
          { status: 401 }
        );
      })
    );

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/username/i), 'baduser');
    await userEvent.type(screen.getByLabelText(/password/i), 'badpass');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    const error = await screen.findByText(/failed to authenticate/i);
    expect(error).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /create artist/i })
    ).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
});

describe('App random artist flow', () => {
  it('fetches and displays a random artist', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /random artist/i })
    );

    const artist = await screen.findByText(/cool band/i);
    expect(artist).toBeInTheDocument();
  });
});
