import { Button, Container, Row, Text } from '@nextui-org/react';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { capitalize } from '../../helpers/capitalize';
import {
  IFormDataUpdate,
  updateUser,
  uploadImageUser,
} from '../../services/user';

interface Props {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const FormUserConfig = ({ setIsOpenModal }: Props) => {
  const { user, dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFromData] = useState({
    name: user!.name,
    email: user!.email,
    password: '',
    password1: '',
    password2: '',
  });

  const [disbledInputs, setDisabledInputs] = useState({
    name: true,
    email: true,
    password: true,
  });

  const [formErrors, setFormErrors] = useState<typeof formData>(
    {} as typeof formData
  );

  const handleEditCancel = (nameInput: keyof typeof disbledInputs) => {
    setDisabledInputs({
      ...disbledInputs,
      [nameInput]: !disbledInputs[nameInput],
    });
    setFromData({ ...formData, [nameInput]: user![nameInput] });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors: typeof formData = {} as typeof formData;
    type typesForm = keyof typeof formData;

    for (const key in formData) {
      const value = formData[key as typesForm];

      if (key !== 'password' && key !== 'password1' && key !== 'password2') {
        // Validar que el campo no este vacio
        if (value?.trim().length === 0) {
          errors[key as typesForm] = 'El campo es requerido';
        }

        // Validar que el campo sea mayor a 4 caracteres
        if (value?.trim().length! >= 1 && value?.trim().length! < 4) {
          errors[key as typesForm] = 'Debe tener al menos 4 caracteres';
        }
      }
    }

    // Validar que el email sea valido
    if (
      formData.email.trim().length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = 'Debe ser un correo valido';
    }

    // Validacion para cuando se este editando una contraseña
    if (!disbledInputs.password) {
      if (!formData.password) errors.password = 'El campo es requerido';
      if (!formData.password1) errors.password1 = 'El campo es requerido';
      if (!formData.password2) errors.password2 = 'El campo es requerido';

      if (
        formData.password?.length > 0 &&
        formData.password?.trim().length < 6
      ) {
        errors.password = 'Debe tener al menos 6 caracteres';
      }
      if (
        formData.password1?.length > 0 &&
        formData.password1?.trim().length < 6
      ) {
        errors.password1 = 'Debe tener al menos 6 caracteres';
      }
      if (
        formData.password2?.length > 0 &&
        formData.password2?.trim().length < 6
      ) {
        errors.password2 = 'Debe tener al menos 6 caracteres';
      }

      // Validar que las contraseñas coincidan
      if (
        !errors.password1 &&
        !errors.password2 &&
        formData.password1 !== formData.password2
      ) {
        errors.password2 = 'Las contraseñas no coinciden';
      }
    }

    return errors;
  };

  const handleSave = async () => {
    const errors = validateForm();
    setLoading(true);

    // Si hay errores
    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // Si no hay errores editar el usuario
    const { name, email, password, password1 } = formData;
    const data: IFormDataUpdate = {
      _id: user!._id!,
      name,
      email,
      password,
      newPassword: password1,
    };

    const { msg, user: userUpdated } = await updateUser(data);

    if (!userUpdated) {
      Swal.fire('Error', msg, 'error');
      setLoading(false);
      return;
    }

    Swal.fire('Exito', msg, 'success');
    dispatch({ type: 'updateUser', payload: userUpdated });

    setIsOpenModal(false);
    setLoading(false);
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const { msg, user: userUpdated } = await uploadImageUser(
        file,
        user?._id!
      );

      if (!userUpdated) {
        Swal.fire('Error', msg, 'error');
        return;
      }

      Swal.fire('Exito', msg, 'success');
      dispatch({ type: 'updateUser', payload: userUpdated });
    }
  };

  return (
    <Container css={{ width: '500px' }}>
      <Text h3 css={{ marginBottom: '20px' }}>
        Tú información
      </Text>
      <div
        style={{
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <img
          src={
            user!.picture ? user!.picture : './src/assets/imgs/user-default.png'
          }
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <button
          style={{
            background: '#161616',
            color: '#fff',
            borderRadius: '8px',
            padding: '5px 10px',
            border: 'none',
            cursor: 'pointer',
            position: 'absolute',
            bottom: '10px',
            right: '70px',
          }}
          onClick={() => document.getElementById('picture')?.click()}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fa-solid fa-plus"></i>
            <i
              className="fa-solid fa-image"
              style={{ marginLeft: '5px', fontSize: '25px' }}
            ></i>
          </div>
        </button>
        <input
          name={'picture'}
          type="file"
          hidden
          multiple={false}
          id={'picture'}
          onChange={handleChangeFile}
        />
      </div>
      <Row justify="space-between" align="flex-end">
        <Text size={'18px'} css={{ textAlign: 'start' }}>
          <b className="user-config-label">Nombre:</b>
          <input
            className={disbledInputs.name ? 'input-disabled' : 'input-edit'}
            disabled={disbledInputs.name}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Text>
        <i
          className={
            disbledInputs.name ? 'fa-solid fa-pencil' : 'fa-solid fa-ban'
          }
          style={{ color: '#333333', cursor: 'pointer', fontSize: '18px' }}
          onClick={() => handleEditCancel('name')}
        ></i>
      </Row>
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
      <Row justify="space-between" align="flex-end">
        <Text size={'18px'} css={{ textAlign: 'start' }}>
          <b className="user-config-label">Correo:</b>
          <input
            className={disbledInputs.email ? 'input-disabled' : 'input-edit'}
            disabled={disbledInputs.email}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Text>
        <i
          className={
            disbledInputs.email ? 'fa-solid fa-pencil' : 'fa-solid fa-ban'
          }
          style={{ color: '#333333', cursor: 'pointer', fontSize: '18px' }}
          onClick={() => handleEditCancel('email')}
        ></i>
      </Row>
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
      <Row justify="space-between" align="flex-end">
        {disbledInputs.password && (
          <Text size={'18px'} css={{ textAlign: 'start' }}>
            <b className="user-config-label">Contraseña:</b> ***************
          </Text>
        )}
        {!disbledInputs.password && (
          <Text size={'18px'} css={{ textAlign: 'start' }}>
            <b className="user-config-label">Contraseña:</b>
            <input
              className={
                disbledInputs.password ? 'input-disabled' : 'input-edit'
              }
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Text>
        )}
        <i
          className={
            disbledInputs.password ? 'fa-solid fa-pencil' : 'fa-solid fa-ban'
          }
          style={{ color: '#333333', cursor: 'pointer', fontSize: '18px' }}
          onClick={() => handleEditCancel('password')}
        ></i>
      </Row>
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
      <Row justify="space-between" align="flex-end">
        {!disbledInputs.password && (
          <Text size={'18px'} css={{ textAlign: 'start' }}>
            <b className="user-config-label">Nueva contraseña:</b>
            <input
              className={
                disbledInputs.password ? 'input-disabled' : 'input-edit'
              }
              type="password"
              name="password1"
              value={formData.password1}
              onChange={handleChange}
            />
          </Text>
        )}
      </Row>
      {/* Mensaje de error */}
      <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
        {formErrors.password1 && (
          <>
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ marginRight: '10px' }}
            ></i>
            {formErrors.password1}
          </>
        )}
      </Text>
      <Row justify="space-between" align="flex-end">
        {!disbledInputs.password && (
          <Text size={'18px'} css={{ textAlign: 'start' }}>
            <b className="user-config-label">Repetir contraseña:</b>
            <input
              className={
                disbledInputs.password ? 'input-disabled' : 'input-edit'
              }
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
            />
          </Text>
        )}
      </Row>
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
      <Text size={'18px'} css={{ textAlign: 'start' }}>
        <b className="user-config-label">Departamento:</b>
        {capitalize(user?.department.name!)}
      </Text>
      <Text size={'18px'} css={{ textAlign: 'start' }}>
        <b className="user-config-label">Rol:</b>
        {capitalize(user?.role.name!)}
      </Text>
      {(!disbledInputs.email ||
        !disbledInputs.name ||
        !disbledInputs.password) && (
        <Button
          css={{ width: '100%', marginTop: '10px', fontWeight: 'bold' }}
          onClick={handleSave}
          disabled={loading}
        >
          Guardar
          <i
            style={{ marginLeft: '10px' }}
            className="fa-solid fa-floppy-disk"
          ></i>
        </Button>
      )}
    </Container>
  );
};
