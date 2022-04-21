import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PrivateRoutes = ({ children }: Props) => {
  const { user } = useContext(AuthContext).authState;
  return <>{user ? children : <Navigate to="/login" replace={true} />}</>;
};
