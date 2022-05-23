import { useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RestaurantScreen } from '../screens/RestaurantScreen';
import { UserScreen } from '../screens/UserScreen';
import { DishScreen } from '../screens/DishScreen';
import { Navbar } from '../components/ui/Navbar';
import { FloatingUserButton } from '../components/ui/FloatingUserButton';
import { UserProvider } from '../contexts/user/UserProvider';
import { AuthContext } from '../contexts/auth/AuthContext';
import { Button } from '@nextui-org/react';
import { RestaurantProvider } from '../contexts/restaurant/RestaurantProvider';
import { DishProvider } from '../contexts/dish/DishProvider';

export const DashboardRoutes = () => {
  const { user, dispatch } = useContext(AuthContext);
  const screens = user!.role.screens.map((s) => s.name);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = () => {
    // Remove token del localStorage
    localStorage.removeItem('token');
    // Actualizar el state del contexto con el usuario
    dispatch({ type: 'LOGOUT' });
  };

  return screens.length === 0 ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2>No tienes permisos para usar panel</h2>
      <Button onClick={handleLogout}>Cerrar sesión</Button>
    </div>
  ) : (
    <div className="dashboard">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <motion.div
        className="dashboard__screens"
        style={{
          paddingTop: '110px',
          paddingBottom: '110px',
        }}
        initial={{ paddingLeft: '65px' }}
        animate={isOpen ? { paddingLeft: '180px' } : { paddingLeft: '65px' }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >
        <FloatingUserButton />
        <Routes>
          <Route path="/" element={<Navigate to={`/${screens[0]}`} />} />
          {screens.includes('restaurantes') && (
            <Route
              path="/restaurantes"
              element={
                <RestaurantProvider>
                  <RestaurantScreen />
                </RestaurantProvider>
              }
            />
          )}
          {screens.includes('usuarios') && (
            <Route
              path="/usuarios"
              element={
                <UserProvider>
                  <UserScreen />
                </UserProvider>
              }
            />
          )}
          {screens.includes('platillos') && (
            <Route
              path="/platillos"
              element={
                <DishProvider>
                  <DishScreen />
                </DishProvider>
              }
            />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </motion.div>
    </div>
  );
};
