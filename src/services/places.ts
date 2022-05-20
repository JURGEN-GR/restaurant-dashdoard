import { Feature, PlacesResponse } from '../interfaces/Places';

const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const token = import.meta.env.VITE_MAPBOX_TOKEN;

export const searchPlaces = async (
  query: string,
  limit = 5
): Promise<Feature[]> => {
  const url = `${baseURL}/${query}.json?access_token=${token}&limit=${limit}&language=es&proximity=-101.94851159984111,23.776462743414914`;
  const response = await fetch(url);
  const data = (await response.json()) as PlacesResponse;
  return data.features;
};
