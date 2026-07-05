import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/authService';
import { useAuth } from './authContext';

type LoginViewModel = {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  errorMessage: string;
  isPending: boolean;
  handleLogin: (e: React.FormEvent) => void;
};

export function useLoginViewModel(): LoginViewModel {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();

  const { mutate, error, isPending } = useMutation({
    mutationFn: () => loginUser(username, password),
    onSuccess: (token) => setToken(token),
  });

  const errorMessage = error
    ? `Failed to authenticate: ${error instanceof Error ? error.message : String(error)}`
    : '';

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    mutate();
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    isPending,
    handleLogin,
  };
}
