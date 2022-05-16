import { ChangeEvent, useContext, useState } from 'react';
import { Button, Container, FormElement, Input, Text } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { UserContext } from '../../../../contexts/user/UserContext';
import { IDepartment } from '../../../../interfaces/Department';
import {
  addDepartment,
  updateDepartment,
} from '../../../../services/department';

export const FormDepartment = () => {
  const { itemSelected, setDepartments, setOpen } = useContext(UserContext);

  const department = itemSelected as IDepartment;

  const [formData, setFormData] = useState<IDepartment>(
    itemSelected ? department : { name: '' }
  );

  const [formErrors, setFormErrors] = useState<IDepartment>({} as IDepartment);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // validar formulario
    const errors = {} as IDepartment;
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

  const editDepartment = async () => {
    const { msg, department } = await updateDepartment(formData);
    if (!department) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    setOpen(false);
    Swal.fire('Exito', 'Departamento editado con exito', 'success');
    // Actualizar el state de los departamentos
    setDepartments((departments) => [
      ...departments!.filter((d) => d._id !== department._id),
      department,
    ]);
    return;
  };

  const createDepartment = async () => {
    const { msg, department } = await addDepartment(formData);
    if (!department) {
      Swal.fire('Error', msg, 'error');
      return;
    }
    setOpen(false);
    Swal.fire('Exito', 'Departamento creado con exito', 'success');
    // Actualizar el state de los departamentos
    setDepartments((departments) => [...departments!, department]);
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

    // En caso de editar un departamento
    if (department) {
      console.log('entro al if');

      await editDepartment();
      setLoading(false);
      return;
    }

    // En caso de crear un departamento
    await createDepartment();
    setLoading(false);
  };

  return (
    <Container css={{ width: '400px' }}>
      <Text
        h3
        css={{ textAlign: 'center', lineHeight: '$xs', marginBottom: '20px' }}
      >
        {itemSelected ? 'Editar departamento' : 'Nuevo departamento'}
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
          {itemSelected ? 'Actualizar departamento' : 'Crear departamento'}
        </Text>
      </Button>
    </Container>
  );
};
