import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RestaurantScreen } from '../components/dashboard/RestaurantScreen';
import { UserScreen } from '../components/dashboard/user/UserScreen';
import { FoodScreen } from '../components/dashboard/FoodScreen';
import { Navbar } from '../components/ui/Navbar';
import { FloatingUserButton } from '../components/ui/FloatingUserButton';
import { UserProvider } from '../contexts/user/UserProvider';

export const DashboardRoutes = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
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
          <Route path="/" element={<Navigate to="/restaurantes" />} />
          <Route path="/restaurantes" element={<RestaurantScreen />} />
          <Route
            path="/usuarios"
            element={
              <UserProvider>
                <UserScreen />
              </UserProvider>
            }
          />
          <Route path="/platillos" element={<FoodScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </motion.div>
    </div>
  );
};
