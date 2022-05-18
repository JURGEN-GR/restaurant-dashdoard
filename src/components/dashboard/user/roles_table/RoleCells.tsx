import { useContext } from 'react';
import { Col, Row, Text, Tooltip } from '@nextui-org/react';
import { UserContext } from '../../../../contexts/user/UserContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IRole } from '../../../../interfaces/Role';

export const RoleCells = (role: IRole, columnKey: string) => {
  const { setOpen, setItemSelected, setTypeForm } = useContext(UserContext);

  const handleEdit = () => {
    setTypeForm('role');
    setItemSelected(role);
    setOpen(true);
  };

  const handleView = () => {
    setTypeForm('viewRole');
    setItemSelected(role);
    setOpen(true);
  };

  switch (columnKey) {
    case 'name':
      return <Text>{capitalize(role.name!)}</Text>;

    case 'actions':
      return (
        <Row justify="center" align="center">
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Details">
              <i
                className="fa-solid fa-eye icon-btn"
                style={{ color: '#979797' }}
                onClick={handleView}
              ></i>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Edit role">
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
