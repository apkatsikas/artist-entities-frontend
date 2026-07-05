import { createTheme } from '@mui/material/styles';

export const sxPresets = {
  artistDisplay: {
    fontSize: { xs: 'clamp(2rem, 12vw, 6rem)', md: 'clamp(3rem, 10vw, 10rem)' },
    fontWeight: 600,
    textAlign: 'center',
    mb: 4,
    minHeight: 'clamp(3rem, 25vw, 15rem)',
  },
  sectionError: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
  },
  formFeedback: {
    textAlign: 'center',
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
  },
  sectionLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: '1rem', md: '1.5rem' },
    mt: { xs: '5vh', md: '10vh' },
    width: '100%',
  },
} as const;

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    primary: {
      main: '#1a1a1a',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff4d4d',
    },
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          lineHeight: 1.4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 'clamp(1rem, 2vw + 0.5rem, 2rem)',
          padding: '0.75rem 2rem',
          transition: 'background-color 0.2s ease, transform 0.1s ease',
          '&:hover': {
            backgroundColor: '#333333',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});
