import { useState } from 'react';
import { IDepartment } from '../../interfaces/Department';
import { IRestaurant } from '../../interfaces/Restaurant';
import { IRole } from '../../interfaces/Role';
import { IScreen } from '../../interfaces/Screen';
import { IUser } from '../../interfaces/User';
import { UserContext } from './UserContext';

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

type formTypes =
  | 'user'
  | 'role'
  | 'department'
  | 'viewUser'
  | 'viewDepartment'
  | 'viewRole'
  | null;

export const UserProvider = ({ children }: AuthProviderProps) => {
  const [itemSelected, setItemSelected] = useState<
    IUser | IRole | IDepartment | null
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [roles, setRoles] = useState<IRole[] | null>(null);
  const [departments, setDepartments] = useState<IDepartment[] | null>(null);
  const [restaurants, setRestaurants] = useState<IRestaurant[] | null>(null);
  const [screens, setScreens] = useState<IScreen[] | null>(null);

  const [typeForm, setTypeForm] = useState<formTypes>(null);

  const values = {
    itemSelected,
    setItemSelected,
    open,
    setOpen,
    users,
    setUsers,
    roles,
    setRoles,
    departments,
    setDepartments,
    restaurants,
    setRestaurants,
    typeForm,
    setTypeForm,
    screens,
    setScreens,
  };

  return (
    <UserContext.Provider value={{ ...values }}>
      {children}
    </UserContext.Provider>
  );
};
