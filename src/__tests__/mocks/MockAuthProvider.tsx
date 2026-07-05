import type { JSX, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from '../../features/auth/hooks/authContext';

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

export const MockAuthProvider = ({
  token = 'FAKE_JWT',
  children,
}: {
  token?: string;
  children: ReactNode;
}): JSX.Element => {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      <AuthContext.Provider value={{ token, setToken: () => {} }}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};
