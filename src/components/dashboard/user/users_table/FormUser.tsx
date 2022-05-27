import { ChangeEvent, useContext, useState } from 'react';
import {
  Button,
  Container,
  FormElement,
  Input,
  Row,
  Text,
} from '@nextui-org/react';
import Swal from 'sweetalert2';
import { UserContext } from '../../../../contexts/user/UserContext';
import { capitalize } from '../../../../helpers/capitalize';
import { IUser } from '../../../../interfaces/User';
import { addUser, updateUser } from '../../../../services/user';

interface IFormData {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  password2?: string;
  dateStart: string;
  birthday: string;
  restaurant: string;
  role: string;
  department: string;
}

let initialState: IFormData = {
  name: '',
  email: '',
  password: '',
  password2: '',
  dateStart: '',
  birthday: '',
  restaurant: '',
  role: '',
  department: '',
};

export const FormUser = () => {
  const { roles, departments, itemSelected, restaurants, setOpen, setUsers } =
    useContext(UserContext);

  const user = itemSelected as IUser;

  const [loading, setLoading] = useState<boolean>(false);

  // En caso de que se este editando un usuario
  const [formData, setFormData] = useState<IFormData>(
    itemSelected
      ? {
          _id: user._id,
          name: user.name,
          email: user.email,
          dateStart: user.dateStart.split('T')[0],
          birthday: user.birthday.split('T')[0],
          restaurant: user.restaurant?._id || '',
          role: user.role._id || '',
          department: user.department._id || '',
        }
      : initialState
  );

  const [formErrors, setFormErrors] = useState<typeof formData>(
    {} as typeof formData
  );

  const handleChange = (e: ChangeEvent<FormElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    type typesForm = keyof typeof formData;
    const errors = {} as typeof formData;

    for (const key in formData) {
      const value = formData[key as typesForm];

      // Validar que el campo no este vacio
      if (value?.trim().length === 0) {
        errors[key as typesForm] = 'El campo es requerido';
      }

      // Validar que el campo sea mayor a 4 caracteres
      if (value?.trim().length! >= 1 && value?.trim().length! < 4) {
        errors[key as typesForm] = 'Debe tener al menos 4 caracteres';
      }
    }

    // Validar el correo
    if (
      formData.email.trim().length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = 'Debe ser un correo valido';
    }

    if (formData.password) {
      if (
        formData.password!.trim().length < 6 ||
        formData.password2!.trim().length < 6
      ) {
        errors.password = 'Debe tener al menos 6 caracteres';
        errors.password2 = 'Debe tener al menos 6 caracteres';
      }

      // Validar que las contraseñas coincidan
      if (
        !errors.password &&
        !errors.password2 &&
        formData.password !== formData.password2
      ) {
        errors.password = 'Las contraseñas no coinciden';
      }
    }

    return errors;
  };

  const createUser = async () => {
    // const userData: IUser = {
    //   name: formData.name,
    //   email: formData.email,
    //   password: formData.password,
    //   dateStart: formData.dateStart,
    //   birthday: formData.birthday,
    //   restaurant: formData.restaurant,
    //   role: formData.role,
    //   department: formData.department,
    // };

    const { msg, user } = await addUser(formData);
    if (!user) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    setOpen(false);
    Swal.fire('Exito', 'Usuario creado con exito', 'success');
    // Actualizar el state de los usuarios
    setUsers((users) => [...users!, user]);
    return;
  };

  const editUser = async () => {
    const { msg, user } = await updateUser(formData);
    if (!user) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    setOpen(false);
    Swal.fire('Exito', 'Usuario editado con exito', 'success');
    // Actualizar el state de los usuarios
    setUsers((users) => [...users!.filter((u) => u._id !== user._id), user]);
    return;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    setLoading(true);

    // Si hay errores
    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // En caso de que se este editando un
    if (user) {
      await editUser();
      setLoading(false);
      return;
    }

    await createUser();
    setLoading(false);
    return;
  };

  return (
    <Container css={{ width: '500px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '10px' }}
      >
        {itemSelected ? 'Editar usuario' : 'Nuevo usuario'}
      </Text>
      <Input
        label="Nombre"
        color={formErrors.name ? 'error' : 'default'}
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
      <Input
        label="Correo"
        color={formErrors.email ? 'error' : 'default'}
        css={{ width: '100%', textAlign: 'start', marginTop: '5px' }}
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {/* Mensaje de error */}
      <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
        {formErrors.email && (
          <>
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ marginRight: '10px' }}
            ></i>
            {formErrors.email}
          </>
        )}
      </Text>
      {!itemSelected && (
        <Row justify="space-between" css={{ marginTop: '5px' }}>
          <div style={{ width: '48%' }}>
            <Input.Password
              label="Contraseña"
              color={formErrors.password ? 'error' : 'default'}
              css={{ width: '100%', textAlign: 'start' }}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Mensaje de error */}
            <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
              {formErrors.password && (
                <>
                  <i
                    className="fa-solid fa-circle-exclamation"
                    style={{ marginRight: '10px' }}
                  ></i>
                  {formErrors.password}
                </>
              )}
            </Text>
          </div>
          <div style={{ width: '48%' }}>
            <Input.Password
              label="Confirmar contraseña"
              color={formErrors.password2 ? 'error' : 'default'}
              css={{ width: '100%', textAlign: 'start' }}
              name="password2"
              value={formData.password2}
              onChange={handleChange}
            />
            {/* Mensaje de error */}
            <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
              {formErrors.password2 && (
                <>
                  <i
                    className="fa-solid fa-circle-exclamation"
                    style={{ marginRight: '10px' }}
                  ></i>
                  {formErrors.password2}
                </>
              )}
            </Text>
          </div>
        </Row>
      )}

      <Row justify="space-between" css={{ marginTop: '5px' }}>
        <div style={{ width: '48%' }}>
          <Input
            type="date"
            label="Fecha de nacimiento"
            color={formErrors.birthday ? 'error' : 'default'}
            css={{ width: '100%', textAlign: 'start' }}
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
          {/* Mensaje de error */}
          <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
            {formErrors.birthday && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ marginRight: '10px' }}
                ></i>
                {formErrors.birthday}
              </>
            )}
          </Text>
        </div>
        <div style={{ width: '48%' }}>
          <Input
            type="date"
            label="Fecha de ingreso"
            color={formErrors.dateStart ? 'error' : 'default'}
            css={{ width: '100%', textAlign: 'start' }}
            name="dateStart"
            value={formData.dateStart}
            onChange={handleChange}
          />
          {/* Mensaje de error */}
          <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
            {formErrors.dateStart && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ marginRight: '10px' }}
                ></i>
                {formErrors.dateStart}
              </>
            )}
          </Text>
        </div>
      </Row>
      <Row justify="space-between" css={{ marginTop: '5px' }}>
        <div style={{ width: '48%' }}>
          <select
            style={{ width: '100%' }}
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="" disabled>
              Seleccione un rol
            </option>
            {roles!.map((role) => (
              <option key={role._id} value={role._id}>
                {capitalize(role.name!)}
              </option>
            ))}
          </select>
          {/* Mensaje de error */}
          <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
            {formErrors.role && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ marginRight: '10px' }}
                ></i>
                {formErrors.role}
              </>
            )}
          </Text>
        </div>
        <div style={{ width: '48%' }}>
          <select
            style={{ width: '100%' }}
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="" disabled>
              Seleccione un departmento
            </option>
            {departments!.map((department) => (
              <option key={department._id} value={department._id}>
                {capitalize(department.name)}
              </option>
            ))}
          </select>
          {/* Mensaje de error */}
          <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
            {formErrors.department && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ marginRight: '10px' }}
                ></i>
                {formErrors.department}
              </>
            )}
          </Text>
        </div>
      </Row>
      <select
        style={{ marginTop: '15px' }}
        name="restaurant"
        value={formData.restaurant}
        onChange={handleChange}
      >
        <option value="" disabled>
          Seleccione un restaurante
        </option>
        {restaurants!.map((restaurants) => (
          <option key={restaurants._id} value={restaurants._id}>
            {capitalize(restaurants.location)}
          </option>
        ))}
      </select>
      {/* Mensaje de error */}
      <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
        {formErrors.restaurant && (
          <>
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ marginRight: '10px' }}
            ></i>
            {formErrors.restaurant}
          </>
        )}
      </Text>
      <Button
        css={{ width: '100%', marginTop: '15px' }}
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        <Text b color="#fff">
          {itemSelected ? 'Actualizar usuario' : 'Crear usuario'}
        </Text>
      </Button>
    </Container>
  );
};
