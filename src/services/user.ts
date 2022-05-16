import { IUser } from '../interfaces/User';

interface UsersRespose {
  msg: string;
  users: IUser[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getUsers = async (): Promise<UsersRespose> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as UsersRespose;
};

interface UserResponse {
  msg: string;
  user: IUser;
}

export const addUser = async (user: IUser): Promise<UserResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(user),
  });

  return (await response.json()) as UserResponse;
};

export const updateUser = async (user: IUser) => {
  const token = localStorage.getItem('token') || '';

  // Obtenemos el id del usuario y lo eliminamos del objeto
  const _id = user._id;
  delete user._id;

  const response = await fetch(`${baseURL}/user/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(user),
  });

  return (await response.json()) as UserResponse;
};

export const deleteUser = async (_id: string) => {
  const token = localStorage.getItem('token') || '';

  const response = await fetch(`${baseURL}/user/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as UserResponse;
};
