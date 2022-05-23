import { useContext } from 'react';
import { Col, Row, Text, Tooltip } from '@nextui-org/react';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IMenu } from '../../../../interfaces/Dish';

export const MenuCells = (menu: IMenu, columnKey: string) => {
  const { dispatch } = useContext(DishContext);

  const handleEdit = () => {
    dispatch({
      type: 'setOpen',
      payload: { open: true, typeForm: 'menu', itemSelected: menu },
    });
  };

  const handleView = () => {
    dispatch({
      type: 'setOpen',
      payload: { open: true, typeForm: 'viewMenu', itemSelected: menu },
    });
  };

  switch (columnKey) {
    case 'name':
      return <Text>{capitalize(menu.name!)}</Text>;

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
            <Tooltip content="Editar menú">
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
