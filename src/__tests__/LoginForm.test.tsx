import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

import LoginForm from '../components/LoginForm';
import { MockAuthProvider } from './mocks/MockAuthProvider';

describe('LoginForm', () => {
  it('logs in successfully without showing error', async () => {
    render(
      <MockAuthProvider>
        <LoginForm />
      </MockAuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/username/i), 'alice');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(
      screen.queryByText(/Failed to authenticate/i)
    ).not.toBeInTheDocument();
  });

  it('shows error message on authentication failure', async () => {
    server.use(
      http.post('/login', async () => {
        return HttpResponse.json(
          { Message: 'Invalid credentials' },
          { status: 401 }
        );
      })
    );

    render(
      <MockAuthProvider>
        <LoginForm />
      </MockAuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/username/i), 'alice');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(
      await screen.findByText(/Failed to authenticate: Invalid credentials/i)
    ).toBeInTheDocument();
  });
});
