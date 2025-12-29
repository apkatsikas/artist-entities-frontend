import type { ReactNode } from 'react';
import { AuthContext } from '../../authContext';

export const MockAuthProvider = ({
  token = 'FAKE_JWT',
  children,
}: {
  token?: string;
  children: ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ token, setToken: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};
