import { Map, Marker } from 'mapbox-gl';
import { Feature } from '../../interfaces/Places';
import { IRestaurant } from '../../interfaces/Restaurant';
import { RestaurantState } from './RestaurantProvider';

export type RestaurantAction =
  | { type: 'setRestaurants'; payload: IRestaurant[] }
  | { type: 'setMap'; payload: Map }
  | { type: 'setMarkers'; payload: Marker[] }
  | { type: 'setMarker'; payload: Marker }
  | { type: 'setPlaces'; payload: Feature[] }
  | { type: 'setNewRestaurantMarker'; payload: Marker }
  | { type: 'setNewRestaurant'; payload: IRestaurant }
  | { type: 'setUpdateRestaurant'; payload: IRestaurant };

// {
//   map?: Map;
//   restaurantSelected?: IRestaurant;
//   restaurants: IRestaurant[];
//   places: Feature[];
//   userLocation?: [number, number];
// }

export const restaurantReducer = (
  state: RestaurantState,
  action: RestaurantAction
): RestaurantState => {
  switch (action.type) {
    case 'setRestaurants':
      return {
        ...state,
        restaurants: action.payload,
      };
    case 'setMap':
      return { ...state, map: action.payload };
    case 'setMarkers':
      return { ...state, markers: action.payload };
    case 'setMarker':
      return { ...state, markers: [...state.markers, action.payload] };
    case 'setPlaces':
      return { ...state, places: action.payload };
    case 'setNewRestaurantMarker':
      return { ...state, newRestaurantMarker: action.payload };
    case 'setNewRestaurant':
      return { ...state, restaurants: [...state.restaurants, action.payload] };
    case 'setUpdateRestaurant':
      return {
        ...state,
        restaurants: [
          ...state.restaurants.filter((r) => r._id !== action.payload._id),
          action.payload,
        ],
      };

    default:
      return state;
  }
};
