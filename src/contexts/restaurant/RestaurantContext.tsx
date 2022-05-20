import { createContext, Dispatch } from 'react';
import { IRestaurant } from '../../interfaces/Restaurant';
import { Map, Marker } from 'mapbox-gl';
import { Feature } from '../../interfaces/Places';
import { RestaurantAction } from './restaurantReducer';

interface RestaurantContextProps {
  map?: Map;
  restaurants: IRestaurant[];
  markers: Marker[];
  places: Feature[];
  dispatch: Dispatch<RestaurantAction>;
  newRestaurantMarker?: Marker;

  // No los estoy usando
  restaurantSelected?: IRestaurant;
  userLocation?: [number, number];
}

export const RestaurantContext = createContext<RestaurantContextProps>(
  {} as RestaurantContextProps
);
