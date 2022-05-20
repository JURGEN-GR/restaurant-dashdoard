import { Button, Card, Container, Row, Spacer } from '@nextui-org/react';
import { Marker, Popup } from 'mapbox-gl';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { MapOptions } from '../components/dashboard/restaurant/MapOptions';
import { RestaurantMap } from '../components/dashboard/restaurant/RestaurantMap';
import { RestaurantContext } from '../contexts/restaurant/RestaurantContext';
import { getRestaurants } from '../services/restaurant';

export const RestaurantScreen = () => {
  const { dispatch, restaurants, map, markers } = useContext(RestaurantContext);

  useEffect(() => {
    (async () => {
      const { msg, restaurants } = await getRestaurants();
      if (!restaurants) {
        Swal.fire('Error', msg, 'error');
        return;
      }
      dispatch({ type: 'setRestaurants', payload: restaurants });
    })();
  }, []);

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => marker.remove());
      const newMarkers: Marker[] = [];

      for (const restaurant of restaurants) {
        const { lng, lat } = restaurant;
        const popup = new Popup().setHTML(`
        <h6>${restaurant.location}</h6>
      `);
        const marker = new Marker({
          color: '#4d43ff',
        })
          .setPopup(popup)
          .setLngLat([lng, lat])
          .addTo(map);

        newMarkers.push(marker);

        dispatch({ type: 'setMarkers', payload: newMarkers });
      }
    }
  }, [restaurants]);

  return (
    <Container gap={4} fluid>
      <div className="map-options">
        <MapOptions />
      </div>
      <Spacer />
      <Card css={{ padding: '5px 0px' }}>
        <RestaurantMap />
      </Card>
    </Container>
  );
};
