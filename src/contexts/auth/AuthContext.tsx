import { createContext } from 'react';
import { IUser } from '../../interfaces/User';
import { AuthAction } from './authReducer';

interface AuthContextProps {
  user: IUser | null;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
