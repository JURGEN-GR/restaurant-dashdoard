import { useContext, useState } from 'react';
import { User } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { capitalize } from '../../helpers/capitalize';
import { IUser } from '../../interfaces/User';

export const FloatingUserButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const context = useContext(AuthContext);
  const user = context.user as IUser;
  const dispatch = context.dispatch;

  const handleLogout = () => {
    // Remove token del localStorage
    localStorage.removeItem('token');
    // Actualizar el state del contexto con el usuario
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="user-button">
      <User
        src={user.picture ? user.picture : './src/assets/imgs/user-default.png'}
        name={user.name}
        description={capitalize(user.role.name)}
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
        <a href="">
          <i className="fa-solid fa-gear"></i> Configuracion
        </a>
        <button onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-to-bracket"></i> Cerrar sesión
        </button>
      </motion.div>
    </div>
  );
};
