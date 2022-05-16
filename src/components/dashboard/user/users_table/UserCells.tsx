import { Col, Row, Text, Tooltip, User } from '@nextui-org/react';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../../../contexts/user/UserContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IDepartment } from '../../../../interfaces/Department';
import { IRestaurant } from '../../../../interfaces/Restaurant';
import { IRole } from '../../../../interfaces/Role';
import { IUser } from '../../../../interfaces/User';
import { deleteUser } from '../../../../services/user';

export const UserCells = (
  user: IUser,
  columnKey: string,
  currentUser: boolean = false
) => {
  const { setOpen, setItemSelected, setTypeForm, setUsers } =
    useContext(UserContext);

  const handleEdit = () => {
    if (!currentUser) {
      setTypeForm('user');
      setItemSelected(user);
      setOpen(true);
    }
  };

  const handleView = () => {
    if (!currentUser) {
      setTypeForm('viewUser');
      setItemSelected(user);
      setOpen(true);
    }
  };

  const handleDelete = () => {
    if (!currentUser) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.value) {
          // Eliminar usuario
          await deleteUser(user._id!);
          Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
          // Eliminar usuario de la lista
          setUsers((users) => users!.filter((u) => u._id !== user._id));
        }
      });
    }
  };

  switch (columnKey) {
    case 'name':
      return (
        <User
          squared
          src={
            user.picture ? user.picture : './src/assets/imgs/user-default.png'
          }
          name={user.name}
          css={{ p: 0 }}
        >
          {user.email}
        </User>
      );
    case 'role':
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: 'capitalize' }}>
              {user.role ? (user.role as IRole).name : 'Sin rol'}
            </Text>
          </Row>
          <Row>
            <Text b size={13} css={{ tt: 'capitalize', color: '$accents3' }}>
              {user.department
                ? (user.department as IDepartment).name
                : 'Sin departamento'}
            </Text>
          </Row>
        </Col>
      );

    case 'actions':
      return (
        <Row justify="center" align="center">
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Ver información">
              <i
                className={
                  currentUser ? 'fa-solid fa-ban' : 'fa-solid fa-eye icon-btn'
                }
                style={{ color: '#979797' }}
                onClick={handleView}
              ></i>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Editar usuario">
              <i
                className={
                  currentUser
                    ? 'fa-solid fa-ban'
                    : 'fa-solid fa-pencil icon-btn'
                }
                style={{ color: '#979797' }}
                onClick={handleEdit}
              ></i>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip
              content="Eliminar usuario"
              contentColor={currentUser ? 'default' : 'error'}
            >
              <i
                className={
                  currentUser ? 'fa-solid fa-ban' : 'fa-solid fa-trash icon-btn'
                }
                style={{ color: currentUser ? '#979797' : 'rgb(240, 96, 96)' }}
                onClick={handleDelete}
              ></i>
            </Tooltip>
          </Col>
        </Row>
      );

    case 'restaurant':
      return (
        <Text>{capitalize((user.restaurant as IRestaurant).location)}</Text>
      );
  }
};
