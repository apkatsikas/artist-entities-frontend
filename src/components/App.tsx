import React from 'react';
import LoginForm from './LoginForm';
import ArtistSection from './ArtistSection';
import ArtistEntryForm from './ArtistEntryForm';
import { useAuth } from '../authContext';

const App: React.FC = () => {
  const { token } = useAuth();
  return (
    <>
      <ArtistSection />
      <>{token ? <ArtistEntryForm /> : <LoginForm />}</>
    </>
  );
};

export default App;
