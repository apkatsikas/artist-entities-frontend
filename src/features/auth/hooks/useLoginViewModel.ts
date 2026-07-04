import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useAuth } from './authContext';

export function useLoginViewModel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setToken } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      setToken(token);
    } catch (error) {
      setErrorMessage(
        'Failed to authenticate: ' +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  return { username, setUsername, password, setPassword, errorMessage, handleLogin };
}
