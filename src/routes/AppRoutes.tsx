import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loading } from '@nextui-org/react';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthContext } from '../contexts/auth/AuthContext';
import { renewToken } from '../services/auth';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRoutes = () => {
  const [checking, setChecking] = useState<boolean>(true);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const tokenLocal = localStorage.getItem('token');
      if (tokenLocal) {
        const { user, token } = await renewToken(tokenLocal);
        // Mostrar alerta en caso de error
        if (!user) {
          localStorage.removeItem('token');
          setChecking(false);
          return;
        }

        // Si todo sale bien, guardar el token en el localStorage
        localStorage.setItem('token', token!);

        // Actualizar el state del contexto con el usuario
        dispatch({ type: 'LOGIN', payload: { ...user } });
      }
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Cargando...</h1>
        <Loading size="xl" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginScreen />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <DashboardRoutes />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
