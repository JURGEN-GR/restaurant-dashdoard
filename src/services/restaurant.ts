import { IRestaurant } from '../interfaces/Restaurant';

interface RestaurantsResponse {
  msg: string;
  restaurants: IRestaurant[];
}

const baseURL = import.meta.env.VITE_API_URL;

export const getRestaurants = async (): Promise<RestaurantsResponse> => {
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

interface RestaurantResponse {
  msg: string;
  restaurant: IRestaurant;
}

export const addRestaurant = async (
  restaurant: IRestaurant
): Promise<RestaurantResponse> => {
  const token = localStorage.getItem('token') || '';
  const response = await fetch(`${baseURL}/restaurant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(restaurant),
  });

  return (await response.json()) as RestaurantResponse;
};

export const updateRestaurant = async (
  restaurant: IRestaurant
): Promise<RestaurantResponse> => {
  const token = localStorage.getItem('token') || '';

  const _id = restaurant._id;
  delete restaurant._id;

  const response = await fetch(`${baseURL}/restaurant/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(restaurant),
  });

  return (await response.json()) as RestaurantResponse;
};
