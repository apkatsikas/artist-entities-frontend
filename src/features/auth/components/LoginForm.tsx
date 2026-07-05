import type { JSX, FormEvent } from 'react';

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
    <form className="btm-container" onSubmit={onSubmit}>
      <div className="top-btm-padding">
        <label className="white-text">
          Username:{' '}
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            required
            autoFocus
          />
        </label>
      </div>
      <div className="top-btm-padding">
        <label className="white-text">
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
        </label>
      </div>
      <button className="ak-button create-btn" type="submit">
        Log In
      </button>
      <div className="error-msg">{errorMessage}</div>
    </form>
  );
}

export default LoginForm;
