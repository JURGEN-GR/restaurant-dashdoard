import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from './context/AuthProvider';
import { AppRoutes } from './routes/AppRoutes';

export const App = () => {
  return (
    <AuthProvider>
      <NextUIProvider>
        <AppRoutes />
      </NextUIProvider>
    </AuthProvider>
  );
};
