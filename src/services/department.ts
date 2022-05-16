import { IDepartment } from '../interfaces/Department';

interface DepartmentsResponse {
  msg: string;
  departments: IDepartment[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getDepartments = async (): Promise<DepartmentsResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/department`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as DepartmentsResponse;
};

interface DepartmentResponse {
  msg: string;
  department: IDepartment;
}

export const addDepartment = async (
  department: IDepartment
): Promise<DepartmentResponse> => {
  const token = localStorage.getItem('token') || '';

  const response = await fetch(`${baseURL}/department`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(department),
  });

  return (await response.json()) as DepartmentResponse;
};

export const updateDepartment = async (
  department: IDepartment
): Promise<DepartmentResponse> => {
  const token = localStorage.getItem('token') || '';

  // Obtenemos el id del departamento y lo eliminamos del objeto
  const _id = department._id;
  delete department._id;

  const response = await fetch(`${baseURL}/department/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(department),
  });

  return (await response.json()) as DepartmentResponse;
};
