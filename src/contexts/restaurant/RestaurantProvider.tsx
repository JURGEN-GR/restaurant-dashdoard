import { Map, Marker } from 'mapbox-gl';
import { useReducer } from 'react';
import { Feature } from '../../interfaces/Places';
import { IRestaurant } from '../../interfaces/Restaurant';
import { RestaurantContext } from './RestaurantContext';
import { restaurantReducer } from './restaurantReducer';

interface RestaurantProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface RestaurantState {
  map?: Map;
  restaurants: IRestaurant[];
  markers: Marker[];
  places: Feature[];
  newRestaurantMarker?: Marker;

  restaurantSelected?: IRestaurant;
  userLocation?: [number, number];
}

const InitialState: RestaurantState = {
  map: undefined,
  restaurants: [],
  markers: [],
  places: [],
  newRestaurantMarker: undefined,

  restaurantSelected: undefined,
  userLocation: undefined,
};

export const RestaurantProvider = ({ children }: RestaurantProviderProps) => {
  const [state, dispatch] = useReducer(restaurantReducer, InitialState);

  return (
    <RestaurantContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
};
