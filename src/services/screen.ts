import { IScreen } from '../interfaces/Screen';

interface ScreensResponse {
  msg: string;
  screens: IScreen[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getScreens = async (): Promise<ScreensResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/screen`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as ScreensResponse;
};
