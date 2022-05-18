import { Modal } from '@nextui-org/react';
export const ModalRestaurant = () => {
  const handleClose = () => {};

  return (
    <Modal
      width="max-content"
      css={{ padding: '30px', maxHeight: '570px', overflowY: 'scroll' }}
      // open={open}
      closeButton
      preventClose
      onClose={handleClose}
    >
      <h1>asas</h1>
    </Modal>
  );
};
