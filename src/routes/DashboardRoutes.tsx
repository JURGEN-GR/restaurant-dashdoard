import { useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RestaurantScreen } from '../components/dashboard/restaurant/RestaurantScreen';
import { UserScreen } from '../components/dashboard/user/UserScreen';
import { FoodScreen } from '../components/dashboard/food/FoodScreen';
import { Navbar } from '../components/ui/Navbar';
import { FloatingUserButton } from '../components/ui/FloatingUserButton';
import { UserProvider } from '../contexts/user/UserProvider';
import { AuthContext } from '../contexts/auth/AuthContext';
import { Button } from '@nextui-org/react';

export const DashboardRoutes = () => {
  const { user, dispatch } = useContext(AuthContext);
  const screens = user!.role.screens.map((s) => s.name);

  const [isOpen, setIsOpen] = useState<boolean>(true);

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
      <Button onClick={() => dispatch({ type: 'LOGOUT' })}>
        Cerrar sesión
      </Button>
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
        initial={{ paddingLeft: '180px' }}
        animate={isOpen ? { paddingLeft: '180px' } : { paddingLeft: '65px' }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >
        <FloatingUserButton />
        <Routes>
          <Route path="/" element={<Navigate to={`/${screens[0]}`} />} />
          {screens.includes('restaurantes') && (
            <Route path="/restaurantes" element={<RestaurantScreen />} />
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
            <Route path="/platillos" element={<FoodScreen />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </motion.div>
    </div>
  );
};
