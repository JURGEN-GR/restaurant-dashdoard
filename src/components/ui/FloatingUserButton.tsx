import { useState } from 'react';
import { User } from '@nextui-org/react';
import { motion } from 'framer-motion';

export const FloatingUserButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="user-button">
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Ariana Wattson"
        description="Jefe de concineros"
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
        <button>
          <i className="fa-solid fa-arrow-right-to-bracket"></i> Cerrar sesión
        </button>
      </motion.div>
    </div>
  );
};
