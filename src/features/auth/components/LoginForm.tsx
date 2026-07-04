import React from 'react';

type LoginFormProps = {
  username: string;
  onUsernameChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  errorMessage: string;
  onSubmit: (e: React.FormEvent) => void;
};

function LoginForm({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  errorMessage,
  onSubmit,
}: LoginFormProps) {
  return (
    <form id="login-form" className="btm-container" onSubmit={onSubmit}>
      <div className="top-btm-padding">
        <label className="white-text" htmlFor="username">
          Username:{' '}
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="top-btm-padding">
        <label className="white-text" htmlFor="password">
          Password:{' '}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        />
      </div>
      <button className="ak-button create-btn" type="submit">
        Log In
      </button>
      <div id="secret-result-output" className="error-msg">
        {errorMessage}
      </div>
    </form>
  );
}

export default LoginForm;
