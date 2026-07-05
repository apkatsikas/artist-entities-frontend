import { loginRequest } from '../api/authApi';

type ErrorResponse = { Message: string };

export async function loginUser(
  username: string,
  password: string
): Promise<string> {
  const response = await loginRequest({ userName: username, password });

  if (response.ok) {
    return (await response.json()) as string;
  }

  const errorResp: ErrorResponse = await response.json();
  throw new Error(errorResp.Message);
}
