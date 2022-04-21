import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthenticatedUser, AuthState } from '../interfaces/auth';

export type AuthAction =
  | { type: 'LOGIN'; payload: AuthState }
  | { type: 'LOGOUT' };

export const startLogin = async (
  email: String,
  password: String
): Promise<AuthAction> => {
  const user: AuthenticatedUser = { name: 'test', uid: 'test' };

  return {
    type: 'LOGIN',
    payload: { user },
  };
};
