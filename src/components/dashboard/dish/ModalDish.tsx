import { useContext } from 'react';
import { Modal } from '@nextui-org/react';
import { DishContext } from '../../../contexts/dish/DishContext';
import { FormMenu } from './menus_table/FormMenu';
import { ViewMenu } from './menus_table/ViewMenu';
import { FormDish } from './dishes_table/FormDish';
import { ViewDish } from './dishes_table/ViewDish';
import { ViewDishImages } from './dishes_table/ViewDishImages';

export const ModalDish = () => {
  // setOpen, setItemSelected, typeForm, setTypeForm
  const { open, typeForm, dispatch } = useContext(DishContext);

  const handleClose = () => {
    dispatch({
      type: 'setOpen',
      payload: { open: false, typeForm: '', itemSelected: undefined },
    });
  };

  return (
    <Modal
      width="max-content"
      css={{ padding: '30px', maxHeight: '585px', overflowY: 'scroll' }}
      open={open}
      closeButton
      preventClose
      onClose={handleClose}
    >
      {typeForm === 'menu' && <FormMenu />}
      {typeForm === 'viewMenu' && <ViewMenu />}
      {typeForm === 'dish' && <FormDish />}
      {typeForm === 'viewDish' && <ViewDish />}
      {typeForm === 'viewDishImages' && <ViewDishImages />}
    </Modal>
  );
};
