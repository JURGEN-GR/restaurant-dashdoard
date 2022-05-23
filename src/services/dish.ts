import { IDish } from '../interfaces/Dish';

export interface DishesResponse {
  msg: string;
  dishes: IDish[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getDishes = async (): Promise<DishesResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/dish`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as DishesResponse;
};

export interface DishResponse {
  msg: string;
  dish: IDish;
}

export interface IForm {
  _id?: string;
  name: string;
  menu: string;
  price: number;
  description: string;
}

export const addDish = async (dish: IForm): Promise<DishResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/dish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(dish),
  });

  return (await response.json()) as DishResponse;
};

export const updateDish = async (dish: IForm): Promise<DishResponse> => {
  const token = localStorage.getItem('token') || '';

  // Extraer el id del dish y eliminarlo del objeto
  const _id = dish._id;
  delete dish._id;

  const response = await fetch(`${baseURL}/dish/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(dish),
  });

  return (await response.json()) as DishResponse;
};
