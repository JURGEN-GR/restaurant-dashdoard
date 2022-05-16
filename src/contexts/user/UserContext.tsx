import { createContext, SetStateAction } from 'react';
import { IDepartment } from '../../interfaces/Department';
import { IRestaurant } from '../../interfaces/Restaurant';
import { IRole } from '../../interfaces/Role';
import { IScreen } from '../../interfaces/Screen';
import { IUser } from '../../interfaces/User';

type formTypes =
  | 'user'
  | 'role'
  | 'department'
  | 'viewUser'
  | 'viewDepartment'
  | 'viewRole'
  | null;

interface UserContextProps {
  itemSelected: IUser | IRole | IDepartment | null;
  setItemSelected: React.Dispatch<
    SetStateAction<IUser | IRole | IDepartment | null>
  >;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  users: IUser[] | null;
  setUsers: React.Dispatch<SetStateAction<IUser[] | null>>;
  roles: IRole[] | null;
  setRoles: React.Dispatch<SetStateAction<IRole[] | null>>;
  departments: IDepartment[] | null;
  setDepartments: React.Dispatch<SetStateAction<IDepartment[] | null>>;
  restaurants: IRestaurant[] | null;
  setRestaurants: React.Dispatch<SetStateAction<IRestaurant[] | null>>;
  screens: IScreen[] | null;
  setScreens: React.Dispatch<SetStateAction<IScreen[] | null>>;
  typeForm: formTypes;
  setTypeForm: React.Dispatch<SetStateAction<formTypes>>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
