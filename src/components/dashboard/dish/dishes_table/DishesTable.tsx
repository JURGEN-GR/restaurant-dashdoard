import { Button, Loading, Row, Spacer, Table, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { DishCells } from './DishCells';

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
    key: 'menu',
    label: 'MENÚ',
  },
  {
    key: 'price',
    label: 'PRECIO',
  },
  {
    key: 'description',
    label: 'DESCRIPCIÓN',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
];

export const DishesTable = () => {
  const { dishes, isLoadingTables, dispatch } = useContext(DishContext);

  const handleOpenForm = () => {
    dispatch({ type: 'setOpen', payload: { open: true, typeForm: 'dish' } });
  };

  return (
    <>
      <Row css={{ marginBottom: '20px' }}>
        {!isLoadingTables && (
          <Button
            iconRight={<i className="fa-solid fa-circle-plus"></i>}
            style={{ fontWeight: 'bold', fontSize: '15px' }}
            onClick={handleOpenForm}
          >
            Nuevo platillo
          </Button>
        )}
      </Row>
      {isLoadingTables ? (
        <Row justify="center" align="center">
          <Text h3>Cargando Tabla</Text>
          <Spacer />
          <Loading />
        </Row>
      ) : dishes.length !== 0 ? (
        <Table
          lined
          shadow={false}
          aria-label="Tabla de platillos"
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
          <Table.Body items={dishes}>
            {(dish: any) => (
              <Table.Row key={dish._id}>
                {(columnKey: keyColumn) => (
                  <Table.Cell>{DishCells(dish, columnKey)}</Table.Cell>
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
