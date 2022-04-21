import { Card, Grid, Button, Input, Spacer, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { startLogin } from '../../actions/auth';
import { AuthContext } from '../../context/AuthContext';

export const LoginScreen = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async () => {
    dispatch(await startLogin('', ''));
  };

  return (
    <Grid.Container
      justify="center"
      alignContent="center"
      css={{
        height: '100vh',
        linearGradient: '45deg, #161616 -20%, #eee 50%',
      }}
    >
      <Grid>
        <Card
          css={{
            minWidth: '30vw',
            padding: '$10',
            boxShadow: '$md',
          }}
        >
          <Text h1 css={{ textAlign: 'center', marginBottom: 50 }}>
            Login
          </Text>
          <Input
            label="Correo"
            contentLeft={<i className="fa-solid fa-envelope"></i>}
          />
          <Spacer y={1} />
          <Input.Password
            label="Contraseña"
            contentLeft={<i className="fa-solid fa-lock"></i>}
          />
          <Spacer y={1.5} />
          <Button css={{ backgroundColor: '#a68069' }} onClick={handleLogin}>
            Iniciar sesión
          </Button>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
