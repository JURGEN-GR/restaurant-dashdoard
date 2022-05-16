import { Card, Collapse, Container, Grid } from '@nextui-org/react';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../../contexts/user/UserContext';
import { UserProvider } from '../../../contexts/user/UserProvider';
import { getDepartments } from '../../../services/department';
import { getRestaurants } from '../../../services/restaurant';
import { getRoles } from '../../../services/role';
import { getScreens } from '../../../services/screen';
import { getUsers } from '../../../services/user';
import { DepartmentTable } from './departments_table/DepartmentsTable';
import { ModalUser } from './ModalUser';
import { RolesTable } from './roles_table/RolesTable';
import { UsersTable } from './users_table/UsersTable';

export const UserScreen = () => {
  const { setUsers, setDepartments, setRoles, setRestaurants, setScreens } =
    useContext(UserContext);
  useEffect(() => {
    (async () => {
      const [
        usersResponse,
        rolesResponse,
        departmentsResponse,
        restaurantsResponse,
        screensResponse,
      ] = await Promise.all([
        getUsers(),
        getRoles(),
        getDepartments(),
        getRestaurants(),
        getScreens(),
      ]);

      if (!usersResponse.users) Swal.fire('Error', usersResponse.msg, 'error');
      setUsers(usersResponse.users);
      if (!rolesResponse.roles) Swal.fire('Error', rolesResponse.msg, 'error');
      setRoles(rolesResponse.roles);
      if (!departmentsResponse.departments)
        Swal.fire('Error', departmentsResponse.msg, 'error');
      setDepartments(departmentsResponse.departments);
      if (!restaurantsResponse.restaurants)
        Swal.fire('Error', restaurantsResponse.msg, 'error');
      setRestaurants(restaurantsResponse.restaurants);
      if (!screensResponse.screens)
        Swal.fire('Error', screensResponse.msg, 'error');
      setScreens(screensResponse.screens);
    })();
  }, []);

  return (
    <>
      <Container gap={4} fluid>
        <Card css={{ background: '#fff' }}>
          <UsersTable />
        </Card>
        <Grid.Container justify="space-between" css={{ marginTop: '40px' }}>
          <Grid css={{ width: '48%' }}>
            <Collapse title="Roles" shadow>
              <RolesTable />
            </Collapse>
          </Grid>
          <Grid css={{ width: '48%' }}>
            <Collapse title="Departamentos" shadow>
              <DepartmentTable />
            </Collapse>
          </Grid>
        </Grid.Container>
      </Container>
      <ModalUser />
    </>
  );
};
