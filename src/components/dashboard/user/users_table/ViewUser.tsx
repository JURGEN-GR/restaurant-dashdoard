import { useContext } from 'react';
import { Container, Text } from '@nextui-org/react';
import { UserContext } from '../../../../contexts/user/UserContext';
import { IUser } from '../../../../interfaces/User';
import { capitalize } from '../../../../helpers/capitalize';
import { IDepartment } from '../../../../interfaces/Department';
import { IRole } from '../../../../interfaces/Role';
import { IRestaurant } from '../../../../interfaces/Restaurant';

export const ViewUser = () => {
  const { itemSelected } = useContext(UserContext);
  const user = itemSelected as IUser;
  return (
    <Container css={{ minWidth: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        Información del usuario
      </Text>

      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Nombre:</b> {capitalize(user.name)}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Correo:</b> {capitalize(user.email)}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Cumpleaños:</b> {user.birthday.split('T')[0]}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Fecha de inicio:</b> {user.dateStart.split('T')[0]}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Departamento:</b> {capitalize((user.department as IDepartment).name)}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Rol:</b> {capitalize((user.role as IRole).name!)}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Restaurante:</b>{' '}
        {capitalize((user.restaurant as IRestaurant).location)}
      </Text>
    </Container>
  );
};
