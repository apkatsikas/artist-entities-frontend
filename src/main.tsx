import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './features/shared/constants/theme';
import HomePage from './features/pages/HomePage';
import { AuthProvider } from './features/auth/components/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
