import { Avatar, Collapse, Grid, Text, User } from '@nextui-org/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RestaurantScreen } from '../components/dashboard/RestaurantScreen';
import { UserScreen } from '../components/dashboard/UserScreen';
import { FoodScreen } from '../components/dashboard/FoodScreen';
import { Navbar } from '../components/ui/Navbar';
import { FloatingUserButton } from '../components/ui/FloatingUserButton';

export const DashboardRoutes = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard__screens">
        <FloatingUserButton />
        <Routes>
          <Route path="/" element={<RestaurantScreen />} />
          <Route path="/restaurantes" element={<RestaurantScreen />} />
          <Route path="/usuarios" element={<UserScreen />} />
          <Route path="/platillos" element={<FoodScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
