import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import HomePage from './features/pages/HomePage';
import { AuthProvider } from './features/auth/components/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  </React.StrictMode>
);
