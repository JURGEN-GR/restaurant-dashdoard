import { Container, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/user/UserContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IRole } from '../../../../interfaces/Role';
import { IScreen } from '../../../../interfaces/Screen';

export const ViewRole = () => {
  const { itemSelected } = useContext(UserContext);

  const role = itemSelected as IRole;

  return (
    <Container css={{ minWidth: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        Información del rol
      </Text>

      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Nombre:</b> {capitalize(role.name!)}
      </Text>
      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Pantallas:</b>{' '}
        {role.screens!.length > 0
          ? role.screens!.map((s) => capitalize((s as IScreen).name)).join(', ')
          : 'No tiene pantallas asignadas'}
      </Text>
    </Container>
  );
};
