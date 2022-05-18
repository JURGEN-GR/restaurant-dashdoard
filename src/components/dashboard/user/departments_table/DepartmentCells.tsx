import { useContext } from 'react';
import { Col, Row, Text, Tooltip } from '@nextui-org/react';
import { UserContext } from '../../../../contexts/user/UserContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IDepartment } from '../../../../interfaces/Department';

export const DepartmentCells = (department: IDepartment, columnKey: string) => {
  const { setOpen, setItemSelected, setTypeForm } = useContext(UserContext);

  const handleEdit = () => {
    setItemSelected(department);
    setTypeForm('department');
    setOpen(true);
  };

  const handleView = () => {
    setTypeForm('viewDepartment');
    setItemSelected(department);
    setOpen(true);
  };

  switch (columnKey) {
    case 'name':
      return <Text>{capitalize(department.name)}</Text>;

    case 'actions':
      return (
        <Row justify="center" align="center">
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Ver información">
              <i
                className="fa-solid fa-eye icon-btn"
                style={{ color: '#979797' }}
                onClick={handleView}
              ></i>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Editar departmento">
              <i
                className="fa-solid fa-pencil icon-btn"
                style={{ color: '#979797' }}
                onClick={handleEdit}
              ></i>
            </Tooltip>
          </Col>
        </Row>
      );
  }
};
