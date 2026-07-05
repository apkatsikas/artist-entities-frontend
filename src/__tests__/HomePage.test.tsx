import type { JSX, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../features/pages/HomePage';
import { AuthProvider } from '../features/auth/components/AuthProvider';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
}

function AppWrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

describe('App authenticated flow', () => {
  it('allows user to login and create an artist', async () => {
    render(
      <AppWrapper>
        <HomePage />
      </AppWrapper>
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
      http.post('/login', () => {
        return HttpResponse.json(
          { Message: 'Invalid credentials' },
          { status: 401 }
        );
      })
    );

    render(
      <AppWrapper>
        <HomePage />
      </AppWrapper>
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
      <AppWrapper>
        <HomePage />
      </AppWrapper>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /random artist/i })
    );

    const artist = await screen.findByText(/cool band/i);
    expect(artist).toBeInTheDocument();
  });
});
