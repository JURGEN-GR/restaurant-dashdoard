import { useContext, useLayoutEffect, useRef } from 'react';
import { GeolocateControl, Map } from 'mapbox-gl';
import { RestaurantContext } from '../../../contexts/restaurant/RestaurantContext';

export const RestaurantMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const { dispatch } = useContext(RestaurantContext);

  useLayoutEffect(() => {
    const map = new Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-101.94851159984111, 23.776462743414914],
      zoom: 5,
    }).addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'bottom-left'
    );
    dispatch({ type: 'setMap', payload: map });
  }, []);

  return <div className="map-container" ref={mapContainer}></div>;
};
