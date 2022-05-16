import { ChangeEvent, useContext, useState } from 'react';
import {
  Button,
  Container,
  FormElement,
  Input,
  Row,
  Spacer,
  Switch,
  SwitchEvent,
  Text,
} from '@nextui-org/react';
import Swal from 'sweetalert2';
import { UserContext } from '../../../../contexts/user/UserContext';
import { addRole, updateRole } from '../../../../services/role';
import { IRole } from '../../../../interfaces/Role';
import { IScreen } from '../../../../interfaces/Screen';
import { capitalize } from '../../../../helpers/capitalize';

export const FormRole = () => {
  const { itemSelected, setRoles, setOpen, screens } = useContext(UserContext);

  const role = itemSelected as IRole;
  // transformar el arreglo de screens en un arreglo de string
  const roleScreens: string[] = role
    ? role.screens!.map((s) => {
        if (typeof s === 'string') {
          return s;
        }
        return (s as IScreen)._id;
      })
    : [];

  const [formData, setFormData] = useState(
    itemSelected ? { ...role, screens: roleScreens } : { name: '', screens: [] }
  );

  const [formErrors, setFormErrors] = useState<IRole>({} as IRole);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitch = (e: SwitchEvent, _id: string) => {
    const { checked } = e.target;
    console.log(_id, checked);

    // Eliminar el screen del arreglo de screens
    if (!checked) {
      setFormData({
        ...formData,
        screens: formData.screens.filter((s) => s !== _id),
      });
      return;
    }
    // Agregar el screen al arreglo de screens
    if (checked) {
      setFormData({
        ...formData,
        screens: [...formData.screens, _id],
      });
    }
    return;
  };

  const validateForm = () => {
    // validar formulario
    const errors = {} as IRole;
    // validar que el nombre no este vacio
    if (!formData.name!.trim()) {
      errors.name = 'El campo es requerido';
    }
    // validar que el nombre tengan un minimo de 4 caracteres
    if (formData.name!.trim().length >= 1 && formData.name!.trim().length < 4) {
      errors.name = 'El campo debe tener al menos 4 caracteres';
    }

    return errors;
  };

  const editRole = async () => {
    const data = { ...formData };
    if (formData.name === role.name) {
      delete data.name;
    }

    const { msg, role: editRole } = await updateRole({ ...data });
    if (!editRole) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    setOpen(false);
    Swal.fire('Exito', 'Rol editado con exito', 'success');
    // Actualizar el state de los roles
    setRoles((roles) => [
      ...roles!.filter((d) => d._id !== editRole._id),
      editRole,
    ]);
    return;
  };

  const createRole = async () => {
    const { msg, role } = await addRole(formData);
    if (!role) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    setOpen(false);
    Swal.fire('Exito', 'Rol creado con exito', 'success');
    // Actualizar el state de los roles
    setRoles((roles) => [...roles!, role]);
    return;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    setLoading(true);

    // si hay errores
    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // En caso de editar un rol
    if (role) {
      console.log('entro al if');

      await editRole();
      setLoading(false);
      return;
    }

    // En caso de crear un rol
    await createRole();
    setLoading(false);
  };

  return (
    <Container css={{ width: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        {itemSelected ? 'Editar rol' : 'Nuevo rol'}
      </Text>
      <Input
        label="Nombre"
        css={{ width: '100%', textAlign: 'start' }}
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {/* Mensaje de error */}
      <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
        {formErrors.name && (
          <>
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ marginRight: '10px' }}
            ></i>
            {formErrors.name}
          </>
        )}
      </Text>
      <Spacer />
      <Text css={{ textAlign: 'start', fontSize: '18px', fontWeight: 'bold' }}>
        Pantallas
      </Text>

      {screens?.map((screen) => (
        <div key={screen._id}>
          <Row align="center">
            <Text css={{ textAlign: 'start', fontSize: '14px' }}>
              {capitalize(screen.name)}
            </Text>
            <Spacer />
            <Switch
              checked={formData.screens.includes(screen._id)}
              data-id={screen._id}
              onChange={(e) => handleSwitch(e, screen._id)}
            />
          </Row>
          <Spacer />
        </div>
      ))}

      <Button
        css={{ width: '100%', marginTop: '15px' }}
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        <Text b color="#fff">
          {itemSelected ? 'Actualizar rol' : 'Crear rol'}
        </Text>
      </Button>
    </Container>
  );
};
