import { useState } from 'react';
import type { JSX } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '../hooks/authContext';

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
