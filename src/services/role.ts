import { IRole } from '../interfaces/Role';

interface RolesResponse {
  msg: string;
  roles: IRole[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getRoles = async (): Promise<RolesResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/role`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as RolesResponse;
};

interface RoleResponse {
  msg: string;
  role: IRole;
}

export const addRole = async (role: IRole): Promise<RoleResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(role),
  });

  return (await response.json()) as RoleResponse;
};

export const updateRole = async (role: IRole): Promise<RoleResponse> => {
  const token = localStorage.getItem('token') || '';

  // Obtenemos el id del rol y lo eliminamos del objeto
  const _id = role._id;
  delete role._id;

  console.log('id', _id);

  const response = await fetch(`${baseURL}/role/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(role),
  });

  return (await response.json()) as RoleResponse;
};
