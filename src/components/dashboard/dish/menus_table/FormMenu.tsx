import { ChangeEvent, useContext, useState } from 'react';
import { Button, Container, FormElement, Input, Text } from '@nextui-org/react';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { IMenu } from '../../../../interfaces/Dish';
import { addMenu, updateMenu } from '../../../../services/menu';
import Swal from 'sweetalert2';

export const FormMenu = () => {
  const { itemSelected, dispatch } = useContext(DishContext);

  const menu = itemSelected as IMenu;

  const [formData, setFormData] = useState<IMenu>(
    itemSelected ? menu : { name: '' }
  );

  const [formErrors, setFormErrors] = useState<IMenu>({} as IMenu);

  // Para evitar que el usuario precione el boton varias veces
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // validar formulario
    const errors = {} as IMenu;
    // validar que el nombre no este vacio
    if (!formData.name.trim()) {
      errors.name = 'El campo es requerido';
    }
    // validar que el nombre tengan un minimo de 4 caracteres
    if (formData.name.trim().length >= 1 && formData.name.trim().length < 4) {
      errors.name = 'El campo debe tener al menos 4 caracteres';
    }

    return errors;
  };

  const editMenu = async () => {
    const { msg, menu } = await updateMenu(formData);
    if (!menu) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    dispatch({
      type: 'setOpen',
      payload: { open: false, typeForm: '', itemSelected: undefined },
    });
    Swal.fire('Exito', 'Menú editado con exito', 'success');
    // Actualizar el state del menu
    dispatch({ type: 'updateMenu', payload: menu });
    return;
  };

  const createMenu = async () => {
    const { msg, menu } = await addMenu(formData);
    if (!menu) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    dispatch({
      type: 'setOpen',
      payload: { open: false, typeForm: '', itemSelected: undefined },
    });
    Swal.fire('Exito', 'Menú creado con exito', 'success');
    // Actualizar el state de los menus
    dispatch({ type: 'addMenu', payload: menu });
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

    // En caso de editar un menú
    if (menu) {
      await editMenu();
      setLoading(false);
      return;
    }

    // En caso de crear un menú
    await createMenu();
    setLoading(false);
  };

  return (
    <Container css={{ width: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        {itemSelected ? 'Editar menú' : 'Nuevo menú'}
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
      <Button
        css={{ width: '100%', marginTop: '15px' }}
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        <Text b color="#fff">
          {itemSelected ? 'Actualizar menú' : 'Crear menú'}
        </Text>
      </Button>
    </Container>
  );
};
