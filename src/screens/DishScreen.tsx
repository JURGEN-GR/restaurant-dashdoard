import { Card, Collapse, Container, Grid } from '@nextui-org/react';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { DishesTable } from '../components/dashboard/dish/dishes_table/DishesTable';
import { MenusTable } from '../components/dashboard/dish/menus_table/MenusTable';
import { ModalDish } from '../components/dashboard/dish/ModalDish';
import { DishContext } from '../contexts/dish/DishContext';
import { getDishes } from '../services/dish';
import { getMenus } from '../services/menu';

export const DishScreen = () => {
  const { dispatch } = useContext(DishContext);
  useEffect(() => {
    (async () => {
      const [dishesResponse, menusResponse] = await Promise.all([
        getDishes(),
        getMenus(),
      ]);
      if (!dishesResponse.dishes) {
        Swal.fire('Error', dishesResponse.msg, 'error');
      }
      if (!menusResponse.menus) {
        Swal.fire('Error', menusResponse.msg, 'error');
      }

      const results = {
        dishes: dishesResponse.dishes,
        menus: menusResponse.menus,
      };

      dispatch({ type: 'setAllState', payload: results });
    })();
  }, []);

  return (
    <>
      <Container gap={4} fluid>
        <Card css={{ background: '#fff' }}>
          <DishesTable />
        </Card>
        <Grid css={{ width: '50%', marginTop: '40px' }}>
          <Collapse title="Menús" shadow>
            <MenusTable />
          </Collapse>
        </Grid>
      </Container>
      <ModalDish />
    </>
  );
};
