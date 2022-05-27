import {
  Button,
  Container,
  FormElement,
  Image,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  Textarea,
} from '@nextui-org/react';
import { motion } from 'framer-motion';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { DishContext } from '../../../../contexts/dish/DishContext';
import { IDish } from '../../../../interfaces/Dish';
import {
  addDish,
  deleteFileDish,
  IForm,
  updateDish,
  uploadFileDish,
} from '../../../../services/dish';

interface IFormFiles {
  file1?: File;
  file2?: File;
  file3?: File;
  file4?: File;
}

const initialForm: IForm = {
  name: '',
  menu: '',
  price: '0',
  description: '',
};

const formats = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'svg',
  'mp4',
  'wmv',
  'avi',
  'mov',
];

export const FormDish = () => {
  const { itemSelected, menus, dispatch } = useContext(DishContext);

  const dish = itemSelected as IDish;

  const [formData, setFormData] = useState<IForm>(
    itemSelected
      ? {
          _id: dish._id,
          name: dish.name,
          menu: dish.menu._id!,
          price: `${dish.price}`,
          description: dish.description,
        }
      : initialForm
  );
  const [formErrors, setFormErrors] = useState<IForm>({} as IForm);

  const [formFiles, setFormFiles] = useState<IFormFiles>({});

  // Para evitar que el usuario precione el boton varias veces
  const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<FormElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      // validar que el fromato sea correcto
      const type = files[0].type.split('/')[1];
      if (!formats.includes(type)) {
        Swal.fire({
          title: 'Error',
          text: 'Formato de archivo no valido',
          icon: 'error',
        });
        return;
      }

      setFormFiles({ ...formFiles, [e.target.name]: files[0] });
    }
  };

  const handleRemoveFile = async (name: string, urlImage?: string) => {
    setLoadingRemove(true);
    if (!urlImage) {
      setFormFiles({ ...formFiles, [name]: undefined });
      setLoadingRemove(false);
      return;
    }
    const { msg, dish: newDish } = await deleteFileDish(dish._id!, urlImage!);
    if (!newDish) {
      Swal.fire({ title: 'Error', text: msg, icon: 'error' });
      setLoadingRemove(false);
      return;
    }
    dish.media_library = newDish.media_library;
    dispatch({ type: 'updateDish', payload: newDish });
    setLoadingRemove(false);
  };

  const validateForm = () => {
    const errors: any = {};

    for (const key in formData) {
      const value = formData[key as keyof typeof formData];

      if (key !== 'price') {
        // Validar que el campo no este vacio
        if (value?.trim().length === 0) {
          errors[key] = 'El campo es requerido';
        }

        // Validar que el campo sea mayor a 5 caracteres
        if (value?.trim().length! >= 1 && value?.trim().length! < 4) {
          errors[key] = 'Debe tener al menos 4 caracteres';
        }
      }
    }

    const price = formData.price;
    // Validar que no este vacio
    if (!price || !price?.trim()) {
      errors.price = 'No válido';
    } else if (!/^\d+$/.test(price)) {
      // Validar que sea un numero
      errors.price = 'No válido';
    }

    return errors;
  };

  const uploadFiles = async (_id: string) => {
    const responses = [];

    const keys = ['file1', 'file2', 'file3', 'file4'];

    // Hacer un forEach para recorrer todos los archivos y subirlos
    for (const key of keys) {
      const element = formFiles[key as keyof IFormFiles];
      if (element) {
        const resp = await uploadFileDish(element, _id);
        responses.push(resp);
      }
    }

    // Separar los archivos que se subieron correctamente y los que no
    const filesErrors: string[] = [];
    let mediaLibrary: string[] = [];

    for (let i = 0; i < responses.length; i++) {
      const element = responses[i];
      if (element) {
        const key = keys[i] as keyof IFormFiles;
        element.dish === undefined
          ? filesErrors.push(formFiles[key]!.name)
          : (mediaLibrary = element.dish.media_library);
      }
    }

    return {
      filesErrors,
      mediaLibrary,
    };
  };

  const editDish = async () => {
    const { msg, dish } = await updateDish(formData);
    if (!dish) {
      Swal.fire('Error', msg, 'error');
      return;
    }

    // Subir archivos si se edito el platillo
    const librery = await uploadFiles(dish._id!);

    if (librery.mediaLibrary.length > 0) {
      dish.media_library = librery.mediaLibrary;
    }

    if (librery.filesErrors.length > 0) {
      Swal.fire(
        'Información',
        `El platillo fue editado con exito pero los archivos: <b>${librery.filesErrors.join(
          ', '
        )}</b> no se pudieron subir`,
        'warning'
      );
    } else {
      Swal.fire('Exito', 'Platillo editado con exito', 'success');
    }

    dispatch({
      type: 'setOpen',
      payload: { open: false, typeForm: '', itemSelected: undefined },
    });

    // Actualizar el state del platillo
    dispatch({ type: 'updateDish', payload: dish });
    return;
  };

  const createDish = async (): Promise<IDish | undefined> => {
    const { msg, dish } = await addDish(formData);
    if (!dish) {
      Swal.fire('Error', msg, 'error');
      return;
    }

    // Subir archivos si se creo el platillo
    const librery = await uploadFiles(dish._id!);

    if (librery.mediaLibrary.length > 0) {
      dish.media_library = librery.mediaLibrary;
    }

    if (librery.filesErrors.length > 0) {
      Swal.fire(
        'Información',
        `El platillo fue creado con exito pero los archivos: <b>${librery.filesErrors.join(
          ', '
        )}</b> no se pudieron subir`,
        'warning'
      );
    } else {
      Swal.fire('Exito', 'Platillo creado con exito', 'success');
    }

    dispatch({ type: 'addDish', payload: dish });

    dispatch({
      type: 'setOpen',
      payload: { open: false, typeForm: '', itemSelected: undefined },
    });
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

  const ContainerInputImage = (
    nameInput: keyof typeof formFiles,
    urlImage?: string
  ) => {
    const isImage = urlImage?.includes('image');

    return (
      <motion.div
        initial={{ borderColor: '#d2d2d2' }}
        whileHover={{ borderColor: '#4d43ff' }}
        className={
          formFiles[nameInput] || urlImage
            ? 'container-file-image'
            : 'container-file-input'
        }
      >
        {formFiles[nameInput] || urlImage ? (
          <>
            {formFiles[nameInput]?.type.includes('image') || isImage ? (
              <img
                src={
                  formFiles[nameInput]
                    ? URL.createObjectURL(formFiles[nameInput]!)
                    : urlImage
                }
                className="file-image-video"
              />
            ) : (
              <video
                preload="metadata"
                autoPlay={false}
                controls={false}
                src={
                  formFiles[nameInput]
                    ? URL.createObjectURL(formFiles[nameInput]!)
                    : urlImage
                }
                className="file-image-video"
              ></video>
            )}
            <motion.i
              style={{
                cursor: 'pointer',
                color: '#FF3F3F',
                position: 'absolute',
                top: '70%',
                left: '40%',
              }}
              whileHover={{ scale: 1.5 }}
              className="fa-solid fa-trash"
              onClick={() => {
                if (loadingRemove) return;
                handleRemoveFile(nameInput, urlImage);
              }}
            ></motion.i>
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.3 }}
              className="btn-input-file"
              onClick={() => document.getElementById(nameInput)!.click()}
            >
              <i
                className="fa-solid fa-circle-plus"
                style={{ fontSize: '20px' }}
              ></i>
            </motion.button>
            <input
              name={nameInput}
              type="file"
              hidden
              multiple={false}
              id={nameInput}
              onChange={handleChangeFile}
            />
          </>
        )}
      </motion.div>
    );
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
      {/* Mensaje de error */}
      <Text color="error" css={{ textAlign: 'start', fontSize: '14px' }}>
        {formErrors.menu && (
          <>
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ marginRight: '10px' }}
            ></i>
            {formErrors.menu}
          </>
        )}
      </Text>

      <Text
        css={{
          color: '#000',
          textAlign: 'start',
          fontSize: '14px',
          marginTop: '5px',
        }}
      >
        Imagenes / Videos
      </Text>
      <Row
        justify="space-between"
        css={{
          height: '80px',
          marginTop: '10px',
        }}
      >
        {ContainerInputImage('file1', dish?.media_library[0])}
        {ContainerInputImage('file2', dish?.media_library[1])}
        {ContainerInputImage('file3', dish?.media_library[2])}
        {ContainerInputImage('file4', dish?.media_library[3])}
      </Row>
      <Text
        css={{
          background: '#e9e9e9',
          padding: '5px',
          borderRadius: '15px',
          marginTop: '10px',
        }}
      >
        <b>Formatos válidos:</b> {formats.join(', ')}.
      </Text>

      {/* <Spacer />
      <Loading /> */}

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

      {loading && (
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            background: 'rgba(255,255,255,0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Loading />
          <Spacer />
          <Text h4 color="#000" css={{ textAlign: 'center' }}>
            {itemSelected ? 'Actualizando...' : 'Creando...'}
          </Text>
        </div>
      )}
    </Container>
  );
};
