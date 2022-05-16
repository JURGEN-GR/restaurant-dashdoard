import {
  Card,
  Grid,
  Button,
  Input,
  Spacer,
  Text,
  FormElement,
  Loading,
} from '@nextui-org/react';

import { ChangeEvent, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { login } from '../../services/auth';

interface formData {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const [formData, setFormData] = useState<formData>({
    email: 'alex@gmail.com',
    password: '123456',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    const { user, msg, token } = await login(email, password);
    // Mostrar alerta en caso de error
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      });
      setLoading(false);
      return;
    }

    // Si todo sale bien, guardar el token en el localStorage
    localStorage.setItem('token', token!);
    // Actualizar el state del contexto con el usuario
    dispatch({ type: 'LOGIN', payload: { ...user } });
    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<FormElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid.Container justify="center" alignContent="center" className="login">
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

          <form
            onSubmit={handleLogin}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Input
              name="email"
              label="Correo"
              contentLeft={<i className="fa-solid fa-envelope"></i>}
              value={formData.email}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input.Password
              name="password"
              label="Contraseña"
              contentLeft={<i className="fa-solid fa-lock"></i>}
              value={formData.password}
              onChange={handleChange}
            />
            <Spacer y={1.5} />
            <Button type="submit" disabled={loading}>
              <Text b color="#fff">
                Iniciar sesión
              </Text>
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
