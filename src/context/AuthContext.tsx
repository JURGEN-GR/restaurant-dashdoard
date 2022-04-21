import { createContext } from 'react';
import { AuthAction } from '../actions/auth';
import { AuthState } from '../interfaces/auth';

interface AuthContextProps {
  authState: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
