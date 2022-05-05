import { IUser } from '../interfaces/User';

export interface AuthRespose {
  msg: string;
  user?: IUser;
  token?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<AuthRespose> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return (await response.json()) as AuthRespose;
};

export const renewToken = async (token: string): Promise<AuthRespose> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/renew`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as AuthRespose;
};
