import { Text } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <motion.nav
      className="navbar"
      animate={isOpen ? { minWidth: '180px' } : { minWidth: '50px' }}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
    >
      <motion.h1
        className="navbar__logo"
        animate={{ fontSize: isOpen ? '32px' : '22px' }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >
        Logo
      </motion.h1>
      <motion.ul className="navbar__list">
        <motion.li className="navbar__list-item navbar__list-item-clicked">
          <NavLink
            to="/restaurantes"
            icon="fa-solid fa-shop"
            text="Resturantes"
            isOpen={isOpen}
          />
        </motion.li>
        <motion.li className="navbar__list-item">
          <NavLink
            to="/usuarios"
            icon="fa-solid fa-user-group"
            text="Usuarios"
            isOpen={isOpen}
          />
        </motion.li>
        <motion.li className="navbar__list-item navbar__slide-icon">
          <i
            className="fa-solid fa-caret-left navbar__item-icon"
            onClick={() => setIsOpen(!isOpen)}
          ></i>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
