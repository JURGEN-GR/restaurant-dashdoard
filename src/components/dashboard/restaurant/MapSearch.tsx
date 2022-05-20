import { useContext, useRef } from 'react';
import { FormElement, Input } from '@nextui-org/react';
import { RestaurantContext } from '../../../contexts/restaurant/RestaurantContext';
import { Feature } from '../../../interfaces/Places';
import { searchPlaces } from '../../../services/places';

export const MapSearch = () => {
  const { places, dispatch, map } = useContext(RestaurantContext);

  const debouceRef = useRef<NodeJS.Timeout>();

  const handleSearch = (e: React.ChangeEvent<FormElement>) => {
    const { value } = e.target;

    if (debouceRef.current) {
      clearTimeout(debouceRef.current);
    }

    debouceRef.current = setTimeout(async () => {
      const places = await searchPlaces(value);
      dispatch({ type: 'setPlaces', payload: places });
    }, 350);
  };

  const onPlaceClicked = (place: Feature) => {
    const { geometry } = place;
    const { coordinates } = geometry;
    const [lng, lat] = coordinates;

    map?.flyTo({
      center: [lng, lat],
      zoom: 16,
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input
        aria-label="Buscar un lugar"
        css={{ width: '250px' }}
        placeholder="Buscar un lugar"
        contentRight={<i className="fa-solid fa-magnifying-glass"></i>}
        onChange={handleSearch}
        clearable
      />
      {places !== undefined && places.length !== 0 && (
        <div className="map-search-results">
          {places.map((place) => (
            <div
              key={place.id}
              className="map-search-results-item"
              onClick={() => onPlaceClicked(place)}
            >
              <h5>{place.text_es}</h5>
              <p>{place.place_name_es}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
