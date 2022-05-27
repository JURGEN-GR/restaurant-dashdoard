import { createContext, Dispatch } from 'react';
import { IDish, IMenu } from '../../interfaces/Dish';
import { DishAction } from './dishReducer';

interface DishContextProps {
  dishes: IDish[];
  menus: IMenu[];
  isLoadingTables: boolean;
  open: boolean;
  typeForm: 'dish' | 'viewDish' | 'viewDishImages' | 'menu' | 'viewMenu' | '';
  itemSelected?: IDish | IMenu;
  dispatch: Dispatch<DishAction>;
}

export const DishContext = createContext<DishContextProps>(
  {} as DishContextProps
);
