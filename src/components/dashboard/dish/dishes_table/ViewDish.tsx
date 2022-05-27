import { useContext } from 'react';
import { Container, Row, Text } from '@nextui-org/react';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IDish } from '../../../../interfaces/Dish';

export const ViewDish = () => {
  const { itemSelected } = useContext(DishContext);
  const dish = itemSelected as IDish;

  return (
    <Container css={{ minWidth: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        Información del platillo
      </Text>

      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Nombre:</b> {capitalize(dish.name)}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Menu: </b>
        {dish.menu ? capitalize(dish.menu.name) : 'No asignado'}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Precio: </b>
        {dish.price !== undefined ? `$ ${dish.price}` : 'No asignado'}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Descripción: </b>
        {dish.description ? capitalize(dish.description) : 'No hay descripción'}
      </Text>
    </Container>
  );
};
