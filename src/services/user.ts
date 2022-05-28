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

interface IFormData {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  password2?: string;
  dateStart: string;
  birthday: string;
  restaurant: string;
  role: string;
  department: string;
}

export interface IFormDataUpdate {
  _id: string;
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
}

export const addUser = async (user: IFormData): Promise<UserResponse> => {
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

export const updateUser = async (user: IFormData | IFormDataUpdate) => {
  const token = localStorage.getItem('token') || '';

  // Obtenemos el id del usuario y lo eliminamos del objeto
  const _id = user._id;
  delete user._id;

  // Eliminar la propiedad password si no existe
  if (!user.password) {
    delete user.password;
  }

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

export const uploadImageUser = async (
  file: File,
  _id: string
): Promise<UserResponse> => {
  const token = localStorage.getItem('token') || '';
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${baseURL}/uploads/user/${_id}`, {
    method: 'POST',
    headers: {
      'x-token': token,
    },
    body: formData,
  });

  return (await response.json()) as UserResponse;
};
