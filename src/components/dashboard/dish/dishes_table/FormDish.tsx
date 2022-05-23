import {
  Button,
  Container,
  FormElement,
  Input,
  Row,
  Text,
  Textarea,
} from '@nextui-org/react';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { IDish } from '../../../../interfaces/Dish';
import { addDish, IForm, updateDish } from '../../../../services/dish';

const initialForm: IForm = {
  name: '',
  menu: '',
  price: 0,
  description: '',
};

export const FormDish = () => {
  const { itemSelected, menus, dispatch } = useContext(DishContext);

  const dish = itemSelected as IDish;

  const [formData, setFormData] = useState<IForm>(
    itemSelected
      ? {
          _id: dish._id,
          name: dish.name,
          menu: dish.menu._id!,
          price: dish.price,
          description: dish.description,
        }
      : initialForm
  );

  const [formErrors, setFormErrors] = useState<IForm>({} as IForm);

  // Para evitar que el usuario precione el boton varias veces
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<FormElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // validar formulario
    const errors = {} as IForm;
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

  const editDish = async () => {
    const { msg, dish } = await updateDish(formData);
    if (!dish) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    dispatch({
      type: 'setOpen',
      payload: { open: false, typeForm: '', itemSelected: undefined },
    });
    Swal.fire('Exito', 'Platillo editado con exito', 'success');
    // Actualizar el state del platillo
    dispatch({ type: 'updateDish', payload: dish });
    return;
  };

  const createDish = async () => {
    const { msg, dish } = await addDish(formData);
    if (!dish) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    dispatch({
      type: 'setOpen',
      payload: { open: false, typeForm: '', itemSelected: undefined },
    });
    Swal.fire('Exito', 'Platillo creado con exito', 'success');
    // Actualizar el state de los platillos
    dispatch({ type: 'addDish', payload: dish });
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
    if (dish) {
      await editDish();
      setLoading(false);
      return;
    }

    // En caso de crear un menú
    await createDish();
    setLoading(false);
  };

  return (
    <Container css={{ width: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        {itemSelected ? 'Editar platillo' : 'Nuevo platillo'}
      </Text>
      <Row justify="space-between">
        <div style={{ width: '70%' }}>
          <Input
            label="Nombre"
            css={{ textAlign: 'start', width: '100%' }}
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
        </div>
        <div style={{ width: '25%' }}>
          <Input
            label="Precio"
            type="number"
            css={{ textAlign: 'start', width: '100%' }}
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {/* Mensaje de error */}
          <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
            {formErrors.price && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ marginRight: '10px' }}
                ></i>
                {formErrors.price}
              </>
            )}
          </Text>
        </div>
      </Row>
      <Textarea
        label="Descripción"
        css={{ width: '100%', textAlign: 'start' }}
        rows={4}
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      {/* Mensaje de error */}
      <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
        {formErrors.description && (
          <>
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ marginRight: '10px' }}
            ></i>
            {formErrors.description}
          </>
        )}
      </Text>
      <select name="menu" value={formData.menu} onChange={handleChange}>
        <option value="" disabled>
          Seleccione un menú
        </option>
        {menus.map((menu) => (
          <option key={menu._id} value={menu._id}>
            {menu.name}
          </option>
        ))}
      </select>
      <Row css={{ height: '80px', marginTop: '10px' }}>
        <div style={{ background: 'red', height: '100%', width: '23%' }}>
          <button
            style={{ display: 'inline-block', height: '100%', width: '100%' }}
            onClick={() => document.getElementById('file1')?.click()}
          >
            +
          </button>
          <input type="file" hidden id="file1" />
        </div>
      </Row>
      <Button
        css={{ width: '100%', marginTop: '15px' }}
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        <Text b color="#fff">
          {itemSelected ? 'Actualizar platillo' : 'Crear platillo'}
        </Text>
      </Button>
    </Container>
  );
};
