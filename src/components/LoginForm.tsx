import React, { useState } from 'react';
import { login } from '../api';
import { useAuth } from '../authContext';

type ErrorResponse = { Message: string };

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setToken } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { userName: username, password };

    try {
      const result = await login(payload);

      if (result.ok) {
        const token: string = await result.json();
        setToken(token);
        return;
      }

      const errorResp: ErrorResponse = await result.json();
      setErrorMessage('Failed to authenticate: ' + errorResp.Message);
      return;
    } catch (error) {
      setErrorMessage('Failed to authenticate: ' + error);
    }
  };

  return (
    <form id="login-form" className="btm-container" onSubmit={handleLogin}>
      <div className="top-btm-padding">
        <label className="white-text" htmlFor="username">
          Username:{' '}
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
          onChange={(e) => setPassword(e.target.value)}
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
