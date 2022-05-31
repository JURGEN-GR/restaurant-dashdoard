import { useContext, useState } from 'react';
import { Modal, User } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { capitalize } from '../../helpers/capitalize';
import { FormUserConfig } from './FormUserConfig';

export const FloatingUserButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    // Remove token del localStorage
    localStorage.removeItem('token');
    // Actualizar el state del contexto con el usuario
    dispatch({ type: 'LOGOUT' });
  };

  const handleConfig = () => {
    setIsOpenModal(true);
  };
  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div className="user-button">
        <User
          src={
            user?.picture ? user.picture : './src/assets/imgs/user-default.png'
          }
          name={capitalize(user!.name.split(' ')[0])}
          description={capitalize(user!.role.name)}
        />
        <i
          className="fa-solid fa-caret-down"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
        <motion.div
          className="user-button__content"
          animate={{
            opacity: isOpen ? 1 : 0,
            display: isOpen ? 'block' : 'none',
          }}
          transition={{ ease: 'easeInOut', duration: 0 }}
        >
          <button onClick={handleConfig}>
            <i className="fa-solid fa-gear"></i> Configuracion
          </button>
          <button onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-to-bracket"></i> Cerrar sesión
          </button>
        </motion.div>
      </div>
      <Modal
        width="max-content"
        css={{ padding: '30px', maxHeight: '585px', overflowY: 'scroll' }}
        open={isOpenModal}
        closeButton
        preventClose
        onClose={handleClose}
      >
        <FormUserConfig setIsOpenModal={setIsOpenModal} />
      </Modal>
    </>
  );
};
