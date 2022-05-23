import { useContext } from 'react';
import { Button, Loading, Row, Spacer, Table, Text } from '@nextui-org/react';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { MenuCells } from './MenuCells';

type keyColumn = '_id' | 'name';

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
    key: 'actions',
    label: 'ACCIONES',
  },
];

export const MenusTable = () => {
  const { menus, isLoadingTables, dispatch } = useContext(DishContext);

  const handleOpenForm = () => {
    dispatch({ type: 'setOpen', payload: { open: true, typeForm: 'menu' } });
  };

  return (
    <>
      <Row css={{ marginBottom: '20px' }}>
        {!isLoadingTables && (
          <Button
            iconRight={<i className="fa-solid fa-circle-plus"></i>}
            style={{ fontWeight: 'bold', fontSize: '15px', width: '100%' }}
            onClick={handleOpenForm}
          >
            Nuevo menú
          </Button>
        )}
      </Row>
      {isLoadingTables ? (
        <Row justify="center" align="center">
          <Text h3>Cargando Tabla</Text>
          <Spacer />
          <Loading />
        </Row>
      ) : menus.length !== 0 ? (
        <Table
          lined
          shadow={false}
          aria-label="Tabla de menús"
          css={{
            height: 'auto',
            minWidth: '100%',
          }}
        >
          <Table.Header columns={columns}>
            {(column: IColum) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={menus}>
            {(menu: any) => (
              <Table.Row key={menu._id}>
                {(columnKey: keyColumn) => (
                  <Table.Cell>{MenuCells(menu, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
          <Table.Pagination shadow noMargin align="center" rowsPerPage={4} />
        </Table>
      ) : (
        <Text h4 css={{ textAlign: 'center' }}>
          Aun no hay registros
        </Text>
      )}
    </>
  );
};
