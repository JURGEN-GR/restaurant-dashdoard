import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PublicRoutes = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  return <>{user ? <Navigate to="/" replace={true} /> : children}</>;
};
