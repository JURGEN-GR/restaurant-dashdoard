import { Button, Row, Spacer } from '@nextui-org/react';
import { Marker, Popup } from 'mapbox-gl';
import { useCallback, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { RestaurantContext } from '../../../contexts/restaurant/RestaurantContext';
import { capitalize } from '../../../helpers/capitalize';
import { IRestaurant } from '../../../interfaces/Restaurant';
import { searchPlaces } from '../../../services/places';
import { addRestaurant, updateRestaurant } from '../../../services/restaurant';
import { MapSearch } from './MapSearch';

export const MapOptions = () => {
  const { restaurants, map, newRestaurantMarker, dispatch, markers } =
    useContext(RestaurantContext);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [restaurantSelected, setRestaurantSelected] = useState<string>();

  const [positionSelected, setPositionSelected] = useState<[number, number]>();

  useEffect(() => {
    // Hablitar punteros al dar click en el mapa
    newRestaurantMarker?.remove();
    if (positionSelected) {
      const marker = new Marker({
        color: '#4d43ff',
      })
        .setLngLat(positionSelected)
        .addTo(map!);

      dispatch({ type: 'setNewRestaurantMarker', payload: marker });
    }
  }, [positionSelected]);

  const addMarker = useCallback(
    (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      const { lng, lat } = e.lngLat;
      setPositionSelected([lng, lat]);
    },
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setRestaurantSelected(value);
    if (value !== '') {
      const restaurant = restaurants.find(
        (restaurant) => restaurant._id === value
      );
      const { lng, lat } = restaurant!;
      map?.flyTo({ center: [lng, lat], zoom: 15 });
      return;
    }
    map?.flyTo({ center: [-101.94851159984111, 23.776462743414914], zoom: 5 });
  };

  const handleCreate = () => {
    setIsCreating(true);
    map?.on('click', addMarker);
  };

  const handleEdit = () => {
    setIsEditing(true);

    // Buscar coordenadas del restaurante seleccionado
    const restaurant = restaurants.find((r) => r._id === restaurantSelected);
    const { lng, lat } = restaurant!;
    // Buscar marker actual con las coordenadas
    const marker = markers.find((m) => {
      const { lng: mLng, lat: mLat } = m.getLngLat();
      return mLng === lng && mLat === lat;
    });
    // Borrar el marker
    marker?.remove();
    // Agregar marker dinamico con las coordenadas
    setPositionSelected([lng, lat]);
    // Hablitar punteros al dar click en el mapa
    map?.on('click', addMarker);
  };

  const handleCancel = () => {
    map?.off('click', addMarker);
    setPositionSelected(undefined);

    // En caso de cancelar la edicion, se agrega el marker original
    if (isEditing) {
      setIsEditing(false);
      // Crear marker que estaba antes
      const restaurant = restaurants.find((r) => r._id === restaurantSelected);
      const { lng, lat } = restaurant!;

      const popup = new Popup().setHTML(`
        <h6>${restaurant!.location}</h6>
      `);
      const marker = new Marker({
        color: '#4d43ff',
      })
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(map!);

      dispatch({ type: 'setMarker', payload: marker });
      return;
    }
    setIsCreating(false);
  };

  const handleSaveNewRestaurant = async () => {
    if (!positionSelected)
      return Swal.fire('Error', 'Selecciona una posición', 'error');

    const [lng, lat] = positionSelected!;
    const [place] = await searchPlaces([lng, lat].join(',')!, 1);
    const newRestaurant: IRestaurant = {
      location: place.place_name_es,
      lng,
      lat,
    };

    const { msg, restaurant } = await addRestaurant(newRestaurant);
    if (!restaurant) {
      Swal.fire('Error', msg, 'error');
      return;
    }

    dispatch({ type: 'setNewRestaurant', payload: restaurant });
    map?.off('click', addMarker);
    setIsCreating(false);
    setPositionSelected(undefined);

    Swal.fire('Exito', msg, 'success');
  };

  const handleSaveEditRestaurant = async () => {
    if (!positionSelected)
      return Swal.fire('Error', 'Selecciona una posición', 'error');

    const [lng, lat] = positionSelected!;
    const [place] = await searchPlaces([lng, lat].join(',')!, 1);
    const newRestaurant: IRestaurant = {
      _id: restaurantSelected,
      location: place.place_name_es,
      lng,
      lat,
    };

    const { msg, restaurant } = await updateRestaurant(newRestaurant);
    if (!restaurant) {
      Swal.fire('Error', msg, 'error');
      return;
    }

    dispatch({ type: 'setUpdateRestaurant', payload: restaurant });
    map?.off('click', addMarker);
    setIsEditing(false);
    setPositionSelected(undefined);

    Swal.fire('Exito', msg, 'success');
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Button
          iconRight={<i className="fa-solid fa-circle-plus"></i>}
          style={{ fontWeight: 'bold', fontSize: '15px', width: '220px' }}
          onClick={handleCreate}
          disabled={isEditing}
        >
          Nuevo restaurante
        </Button>
        <Spacer />

        <select
          disabled={isCreating}
          className={`map-select ${isCreating ? 'select-disabled' : ''}`}
          onChange={handleChange}
          value={restaurantSelected}
        >
          <option value="">Todos los restaurantes</option>
          {restaurants!.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {capitalize(restaurant.location)}
            </option>
          ))}
        </select>
        <Spacer />
        {restaurantSelected && !isCreating && (
          <>
            <Button
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                minWidth: '100px',
              }}
              onClick={handleEdit}
            >
              Editar
            </Button>
            <Spacer />
          </>
        )}
        {(isCreating || isEditing) && (
          <>
            <Button
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                minWidth: '100px',
              }}
              onClick={
                isCreating ? handleSaveNewRestaurant : handleSaveEditRestaurant
              }
            >
              Guardar
            </Button>
            <Spacer />
            <Button
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                minWidth: '100px',
              }}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </>
        )}
      </div>
      <MapSearch />
    </>
  );
};
