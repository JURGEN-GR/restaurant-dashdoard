import { useContext, useState } from 'react';
import { Container, Row, Text } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IDish } from '../../../../interfaces/Dish';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface galeryProps {
  images: string[];
}

const Galery = ({ images }: galeryProps) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="gallery-container">
      <AnimatePresence initial={false} custom={direction}>
        {images[imageIndex].includes('image') ? (
          <motion.img
            className="gallery-img-video"
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        ) : (
          <motion.video
            controls
            className="gallery-img-video"
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        )}
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        <i className="fa-solid fa-caret-right"></i>
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <i className="fa-solid fa-caret-left"></i>
      </div>
    </div>
  );
};

export const ViewDishImages = () => {
  const { itemSelected } = useContext(DishContext);
  const dish = itemSelected as IDish;

  return (
    <Container
      css={{
        minWidth: '600px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {dish.media_library?.length === 0 && (
        <Text
          size={'25px'}
          css={{ width: '100%', textAlign: 'center', fontWeight: '$bold' }}
        >
          No tiene archivos multimedia asignados :(
        </Text>
      )}
      {dish.media_library.length > 0 && <Galery images={dish.media_library} />}
    </Container>
  );
};
