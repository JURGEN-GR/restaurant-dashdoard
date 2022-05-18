import { useContext } from 'react';
import { Button, Loading, Row, Spacer, Table, Text } from '@nextui-org/react';
import { AuthContext } from '../../../../contexts/auth/AuthContext';
import { UserCells } from './UserCells';
import { UserContext } from '../../../../contexts/user/UserContext';

type keyColumn =
  | '_id'
  | 'name'
  | 'email'
  | 'dateStart'
  | 'birthday'
  | 'picture'
  | 'role'
  | 'restaurant'
  | 'department'
  | 'actions';

interface IColum {
  key: keyColumn;
  label: string;
}

const columns = [
  {
    key: 'name',
    label: 'NOMBRE',
  },
  {
    key: 'role',
    label: 'ROL',
  },
  {
    key: 'restaurant',
    label: 'RESTAURANTE',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
];

export const UsersTable = () => {
  const { user: currentUser } = useContext(AuthContext);
  const { users, setOpen, setTypeForm } = useContext(UserContext);

  const handleOpenForm = () => {
    setOpen(true);
    setTypeForm('user');
  };

  return (
    <>
      <Text h3 css={{ marginBottom: '20px' }}>
        Usuarios
      </Text>
      {users && (
        <Row css={{ marginBottom: '20px' }}>
          <Button
            iconRight={<i className="fa-solid fa-circle-plus"></i>}
            style={{ fontWeight: 'bold', fontSize: '15px' }}
            onClick={handleOpenForm}
          >
            Nuevo usuario
          </Button>
        </Row>
      )}
      {!users ? (
        <Row justify="center" align="center">
          <Text h3>Cargando Tabla</Text>
          <Spacer />
          <Loading />
        </Row>
      ) : (
        <Table
          lined
          shadow={false}
          aria-label="Tabla de usuarios"
          css={{
            minWidth: '100%',
          }}
        >
          <Table.Header columns={columns}>
            {(column: IColum) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={users}>
            {(user: any) => (
              <Table.Row key={user._id}>
                {(columnKey: keyColumn) => (
                  <Table.Cell>
                    {UserCells(user, columnKey, currentUser!._id === user._id)}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
          <Table.Pagination shadow noMargin align="center" rowsPerPage={4} />
        </Table>
      )}
    </>
  );
};
