import { createTheme, NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { AppRoutes } from './routes/AppRoutes';

export const App = () => {
  const theme = createTheme({
    type: 'light',
    theme: {
      colors: {
        primary: '#4d43ff',
        accents1: '#F1F1F1',
      },
    },
  });

  return (
    <AuthProvider>
      <NextUIProvider theme={theme}>
        <AppRoutes />
      </NextUIProvider>
    </AuthProvider>
  );
};
