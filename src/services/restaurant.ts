import { IRestaurant } from '../interfaces/Restaurant';

interface RestaurantsResponse {
  msg: string;
  restaurants: IRestaurant[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getRestaurants = async () => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/restaurant`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  });

  return (await response.json()) as RestaurantsResponse;
};
