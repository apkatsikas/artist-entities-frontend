import React from 'react';
import LoginForm from './LoginForm';
import ArtistSection from './ArtistSection';
import ArtistEntryForm from './ArtistEntryForm';
import { useAuth } from '../authContext';

const App: React.FC = () => {
  const { token } = useAuth();
  return (
    <main>
      <h1>New Hell Artist Tracker</h1>
      <ArtistSection />
      <>{token ? <ArtistEntryForm /> : <LoginForm />}</>
    </main>
  );
};

export default App;
