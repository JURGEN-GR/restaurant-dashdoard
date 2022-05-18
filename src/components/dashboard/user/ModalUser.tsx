import { useContext } from 'react';
import { Modal } from '@nextui-org/react';
import { UserContext } from '../../../contexts/user/UserContext';
import { FormDepartment } from './departments_table/FormDepartment';
import { ViewDepartment } from './departments_table/ViewDepartment';
import { FormRole } from './roles_table/FormRole';
import { ViewRole } from './roles_table/ViewRole';
import { FormUser } from './users_table/FormUser';
import { ViewUser } from './users_table/ViewUser';

export const ModalUser = () => {
  const { open, setOpen, setItemSelected, typeForm, setTypeForm } =
    useContext(UserContext);

  const handleClose = () => {
    setOpen(false);
    setItemSelected(null);
    setTypeForm(null);
  };

  return (
    <Modal
      width="max-content"
      css={{ padding: '30px', maxHeight: '570px', overflowY: 'scroll' }}
      open={open}
      closeButton
      preventClose
      onClose={handleClose}
    >
      {typeForm === 'user' && <FormUser />}
      {typeForm === 'viewUser' && <ViewUser />}
      {typeForm === 'department' && <FormDepartment />}
      {typeForm === 'viewDepartment' && <ViewDepartment />}
      {typeForm === 'role' && <FormRole />}
      {typeForm === 'viewRole' && <ViewRole />}
    </Modal>
  );
};
