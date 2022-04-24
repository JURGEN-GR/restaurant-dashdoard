import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const variantsAnimate = {
  open: { display: 'inline' },
  close: { display: 'none' },
};

const variantsTransition = {
  open: { ease: 'easeInOut', duration: 0.2, delay: 0.5 },
  close: { ease: 'easeInOut' },
};

interface NavLinkProps {
  to: string;
  text: string;
  icon: string;
  isOpen: boolean;
}

export const NavLink = ({ to, icon, text, isOpen }: NavLinkProps) => {
  return (
    <Link to={to} className="navlink">
      <i className={`navlink__icon ${icon}`}></i>
      <motion.span
        className="navlink__text"
        initial={{ display: 'none' }}
        animate={isOpen ? 'open' : 'close'}
        variants={variantsAnimate}
        transition={isOpen ? variantsTransition.open : variantsTransition.close}
      >
        {text}
      </motion.span>
    </Link>
  );
};
