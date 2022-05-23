import { IMenu } from '../interfaces/Dish';

export interface MenusResponse {
  msg: string;
  menus: IMenu[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getMenus = async (): Promise<MenusResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/menu`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as MenusResponse;
};

export interface MenuResponse {
  msg: string;
  menu: IMenu;
}

export const addMenu = async (menu: IMenu): Promise<MenuResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(menu),
  });

  return (await response.json()) as MenuResponse;
};

export const updateMenu = async (menu: IMenu): Promise<MenuResponse> => {
  const token = localStorage.getItem('token') || '';

  const _id = menu._id;
  delete menu._id;

  const response = await fetch(`${baseURL}/menu/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(menu),
  });

  return (await response.json()) as MenuResponse;
};
