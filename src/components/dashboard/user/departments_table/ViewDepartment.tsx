import { Container, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/user/UserContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IDepartment } from '../../../../interfaces/Department';

export const ViewDepartment = () => {
  const { itemSelected } = useContext(UserContext);
  const department = itemSelected as IDepartment;

  return (
    <Container css={{ minWidth: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        Información del departamento
      </Text>

      <Text size={'18px'} css={{ width: '100%', textAlign: 'center' }}>
        <b>Nombre:</b> {capitalize(department.name)}
      </Text>
    </Container>
  );
};
