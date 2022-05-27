import { useContext } from 'react';
import { Button, Loading, Row, Spacer, Table, Text } from '@nextui-org/react';
import { UserContext } from '../../../../contexts/user/UserContext';
import { DepartmentCells } from './DepartmentCells';

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

export const DepartmentTable = () => {
  const { departments, setOpen, setTypeForm, isLoadingTables } =
    useContext(UserContext);

  const handleOpenForm = () => {
    setOpen(true);
    setTypeForm('department');
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
            Nuevo departamento
          </Button>
        )}
      </Row>
      {isLoadingTables ? (
        <Row justify="center" align="center">
          <Text h3>Cargando Tabla</Text>
          <Spacer />
          <Loading />
        </Row>
      ) : departments && departments.length !== 0 ? (
        <Table
          lined
          shadow={false}
          aria-label="Tabla de departamentos"
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
          <Table.Body items={departments}>
            {(department: any) => (
              <Table.Row key={department._id}>
                {(columnKey: keyColumn) => (
                  <Table.Cell>
                    {DepartmentCells(department, columnKey)}
                  </Table.Cell>
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
