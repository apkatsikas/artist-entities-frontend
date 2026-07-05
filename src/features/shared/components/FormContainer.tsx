import type { JSX, FormEvent, ReactNode } from 'react';
import { Box } from '@mui/material';

type FormContainerProps = {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
};

function FormContainer({
  onSubmit,
  children,
}: FormContainerProps): JSX.Element {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        p: 4,
      }}
    >
      {children}
    </Box>
  );
}

export default FormContainer;
