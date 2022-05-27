import { Col, Row, Text, Tooltip } from '@nextui-org/react';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IDish } from '../../../../interfaces/Dish';
import { deleteDish } from '../../../../services/dish';

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

  const handleViewImages = () => {
    dispatch({
      type: 'setOpen',
      payload: { open: true, typeForm: 'viewDishImages', itemSelected: dish },
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        // Eliminar platillo
        const { msg, dish: deletedDish } = await deleteDish(dish._id!);
        if (!deletedDish) {
          Swal.fire('Error', msg, 'error');
          return;
        }
        Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
        // Eliminar platillo de la lista
        dispatch({ type: 'deleteDish', payload: deletedDish });
      }
    });
  };

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
            <Tooltip content="Ver imágenes">
              <i
                className="fa-solid fa-images"
                style={{ color: '#979797', cursor: 'pointer' }}
                onClick={handleViewImages}
              ></i>
            </Tooltip>
          </Col>
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
