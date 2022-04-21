import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from '../reducers/authReducer';
import { AuthState } from '../interfaces/auth';

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: AuthState = {
  checking: false,
  user: null,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
