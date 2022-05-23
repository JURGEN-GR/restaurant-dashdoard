import { Col, Row, Text, Tooltip } from '@nextui-org/react';
import { useContext } from 'react';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IDish } from '../../../../interfaces/Dish';

export const DishCells = (dish: IDish, columnKey: string) => {
  const { dispatch } = useContext(DishContext);

  const handleEdit = () => {
    dispatch({
      type: 'setOpen',
      payload: { open: true, typeForm: 'dish', itemSelected: dish },
    });
  };

  const handleView = () => {
    dispatch({
      type: 'setOpen',
      payload: { open: true, typeForm: 'viewDish', itemSelected: dish },
    });
  };

  const handleDelete = () => {};

  switch (columnKey) {
    case 'name':
      return <Text>{capitalize(dish.name!)}</Text>;
    case 'menu':
      return <Text>{capitalize(dish.menu.name!)}</Text>;
    case 'price':
      return <Text>${capitalize(dish.price!.toString())}</Text>;
    case 'description':
      return (
        <Text
          style={{
            width: '300px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {capitalize(dish.description!)}
        </Text>
      );

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
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Eliminar menú" contentColor="error">
              <i
                className="fa-solid fa-trash icon-btn"
                style={{ color: 'rgb(240, 96, 96)' }}
                onClick={handleDelete}
              ></i>
            </Tooltip>
          </Col>
        </Row>
      );
  }
};
