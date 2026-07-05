import type { JSX, FormEvent } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import FormContainer from '../../shared/components/FormContainer';

type LoginFormProps = {
  username: string;
  onUsernameChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  errorMessage: string;
  onSubmit: (e: FormEvent) => void;
};

function LoginForm({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  errorMessage,
  onSubmit,
}: LoginFormProps): JSX.Element {
  return (
    <FormContainer onSubmit={onSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        required
        autoFocus
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        required
        fullWidth
      />
      <Button variant="contained" type="submit" fullWidth>
        Log In
      </Button>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </FormContainer>
  );
}

export default LoginForm;
