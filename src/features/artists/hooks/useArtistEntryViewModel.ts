import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createArtist } from '../services/artistService';
import { useAuth } from '../../auth/hooks/authContext';

type ArtistEntryViewModel = {
  artistName: string;
  setArtistName: (value: string) => void;
  displayMessage: string | null;
  isError: boolean;
  isPending: boolean;
  handleCreate: (e: React.FormEvent) => void;
};

export function useArtistEntryViewModel(): ArtistEntryViewModel {
  const [artistName, setArtistName] = useState('');
  const { token } = useAuth();

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: (name: string) => createArtist(name, token ?? ''),
    onSuccess: () => setArtistName(''),
  });

  const displayMessage = data
    ? `Created artist: ${data}`
    : error
      ? `Failed to create artist: ${error instanceof Error ? error.message : String(error)}`
      : null;

  const isError = error !== null;

  const handleCreate = (e: React.FormEvent): void => {
    e.preventDefault();
    mutate(artistName);
  };

  return {
    artistName,
    setArtistName,
    displayMessage,
    isError,
    isPending,
    handleCreate,
  };
}
