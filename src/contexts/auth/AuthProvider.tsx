import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from '../../reducers/authReducer';

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, dispatch] = useReducer(authReducer, null);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
