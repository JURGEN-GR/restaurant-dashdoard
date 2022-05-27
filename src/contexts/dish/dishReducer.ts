import { IDish, IMenu } from '../../interfaces/Dish';
import { DishState } from './DishProvider';

export type DishAction =
  | { type: 'setDishes'; payload: IDish[] }
  | { type: 'addDish'; payload: IDish }
  | { type: 'updateDish'; payload: IDish }
  | { type: 'deleteDish'; payload: IDish }
  | { type: 'setMenus'; payload: IMenu[] }
  | { type: 'addMenu'; payload: IMenu }
  | { type: 'updateMenu'; payload: IMenu }
  | { type: 'setAllState'; payload: { dishes: IDish[]; menus: IMenu[] } }
  | {
      type: 'setOpen';
      payload: {
        open: boolean;
        typeForm:
          | 'dish'
          | 'viewDish'
          | 'viewDishImages'
          | 'menu'
          | 'viewMenu'
          | '';
        itemSelected?: IDish | IMenu;
      };
    };

export const dishReducer = (
  state: DishState,
  action: DishAction
): DishState => {
  switch (action.type) {
    // Acciones de los platillos
    case 'setDishes':
      return { ...state, dishes: action.payload };
    case 'addDish':
      return { ...state, dishes: [...state.dishes, action.payload] };
    case 'updateDish':
      return {
        ...state,
        dishes: state.dishes.map((dish) =>
          dish._id === action.payload._id ? action.payload : dish
        ),
      };
    case 'deleteDish':
      return {
        ...state,
        dishes: state.dishes.filter((dish) => dish._id !== action.payload._id),
      };

    // Acciones de los menus
    case 'setMenus':
      return { ...state, menus: action.payload };
    case 'addMenu':
      return { ...state, menus: [...state.menus, action.payload] };
    case 'updateMenu':
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu._id === action.payload._id ? action.payload : menu
        ),
      };

    // Otro tipo de acciones
    case 'setAllState':
      return { ...state, ...action.payload, isLoadingTables: false };
    case 'setOpen':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
