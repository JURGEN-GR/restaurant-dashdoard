import { Container, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IMenu } from '../../../../interfaces/Dish';

export const ViewMenu = () => {
  const { itemSelected } = useContext(DishContext);
  const menu = itemSelected as IMenu;

  return (
    <Container css={{ minWidth: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        Información del menú
      </Text>

      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Nombre:</b> {capitalize(menu.name)}
      </Text>
    </Container>
  );
};
