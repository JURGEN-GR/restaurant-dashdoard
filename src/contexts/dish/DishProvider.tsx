import { useReducer } from 'react';
import { IDish, IMenu } from '../../interfaces/Dish';
import { DishContext } from './DishContext';
import { dishReducer } from './dishReducer';

interface DishProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface DishState {
  dishes: IDish[];
  menus: IMenu[];
  isLoadingTables: boolean;
  open: boolean;
  typeForm: 'dish' | 'viewDish' | 'menu' | 'viewMenu' | '';
  itemSelected?: IDish | IMenu;
}

const InitialState: DishState = {
  dishes: [],
  menus: [],
  isLoadingTables: true,
  open: false,
  typeForm: '',
  itemSelected: undefined,
};

export const DishProvider = ({ children }: DishProviderProps) => {
  const [state, dispatch] = useReducer(dishReducer, InitialState);

  return (
    <DishContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DishContext.Provider>
  );
};
