import type { JSX, ReactNode } from 'react';
import { AuthContext } from '../../features/auth/hooks/authContext';

export const MockAuthProvider = ({
  token = 'FAKE_JWT',
  children,
}: {
  token?: string;
  children: ReactNode;
}): JSX.Element => {
  return (
    <AuthContext.Provider value={{ token, setToken: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};
