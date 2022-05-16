import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from './NavLink';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Navbar = ({ isOpen, setIsOpen }: Props) => {
  return (
    <motion.nav
      className="navbar"
      initial={{ width: '180px' }}
      animate={isOpen ? { width: '180px' } : { width: '65px' }}
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
        <motion.li>
          <NavLink
            to="/restaurantes"
            icon="fa-solid fa-shop"
            text="Resturantes"
            isOpen={isOpen}
          />
        </motion.li>
        <motion.li>
          <NavLink
            to="/usuarios"
            icon="fa-solid fa-user-group"
            text="Usuarios"
            isOpen={isOpen}
          />
        </motion.li>
        <motion.li className="navbar__slide-icon">
          <i
            className="fa-solid fa-caret-left navbar__item-icon"
            onClick={() => setIsOpen(!isOpen)}
          ></i>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
