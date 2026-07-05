import React, { useState } from 'react';
import { createArtist } from '../services/artistService';
import { useAuth } from '../../auth/hooks/authContext';

type ArtistEntryResult =
  | { name: string; success: true }
  | { message: string; success: false }
  | null;

type ArtistEntryViewModel = {
  artistName: string;
  setArtistName: (value: string) => void;
  displayMessage: string | null;
  isError: boolean;
  handleCreate: (e: React.FormEvent) => Promise<void>;
};

export function useArtistEntryViewModel(): ArtistEntryViewModel {
  const [artistName, setArtistName] = useState('');
  const [result, setResult] = useState<ArtistEntryResult>(null);
  const { token } = useAuth();

  const handleCreate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const name = await createArtist(artistName, token ?? '');
      setResult({ name, success: true });
      setArtistName('');
    } catch (error) {
      setResult({
        message: error instanceof Error ? error.message : String(error),
        success: false,
      });
    }
  };

  const displayMessage = result
    ? result.success
      ? `Created artist: ${result.name}`
      : `Failed to create artist: ${result.message}`
    : null;
  const isError = result ? !result.success : false;

  return { artistName, setArtistName, displayMessage, isError, handleCreate };
}
