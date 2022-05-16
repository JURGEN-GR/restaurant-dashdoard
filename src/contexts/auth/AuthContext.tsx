import { createContext } from 'react';
import { AuthAction } from '../../actions/auth';
import { IUser } from '../../interfaces/User';

interface AuthContextProps {
  user: IUser | null;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
