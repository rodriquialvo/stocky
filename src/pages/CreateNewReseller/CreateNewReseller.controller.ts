import { CreateNewResellerController } from './interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { UserAction } from '../../store/users/actions';
import { useUserStore } from '../../store/users/slice';
import { useRoleStore } from '../../store/roles/slice';
import { ROUTES } from '../../constants/Routes';

export const useCreateNewResellerController = (): CreateNewResellerController => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const reseller = location.state?.reseller;

  const { createOrUpdateStatus } = useUserStore(state => state);
  const { createUser, updateUser, clearCreateOrUpdateStatus } = UserAction();
  const roles = useRoleStore(state => state.roles);
  const loading = useUserStore(state => state.status.isFetching);

  const [formValues, setFormValues] = useState({
    name: reseller ? reseller.name : '',
    lastname: reseller ? reseller.lastname : '',
    email: reseller ? reseller.email : '',
    phone: reseller ? reseller.phone : '',
    roles: reseller ? reseller.roles.map(role => role.id) : [],
    address: reseller ? reseller.address : '',
    active: reseller ? reseller.active : true,
    birthdate: reseller ? reseller.birthdate : new Date(),
    dni: reseller ? reseller.dni : '',
  });

  const texts = {
    title: reseller ? 'Editar Revendedor' : 'Crear revendedor',
    button: reseller ? 'Guardar cambios' : 'Crear revendedor',
  };

  useEffect(() => {
    if (!createOrUpdateStatus.isError && !createOrUpdateStatus.success) {
      return;
    }
    if (createOrUpdateStatus.success) {
      toast({
        title: 'Operación exitosa',
        description: 'La operación se realizo con exito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(ROUTES.RESSELLERS_LIST);
    } else if (createOrUpdateStatus.error) {
      toast({
        title: 'Error',
        description: 'La operación no se pudo realizar.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    clearCreateOrUpdateStatus();
  }, [createOrUpdateStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked }: any = e.target;

    let newValue = value;
    if (type === 'select-one') {
      newValue = [value];
    }

    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : newValue,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormValues({ ...formValues, birthdate: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, lastname, email, phone, roles } = formValues;
    if (!name || !lastname || !email || !phone || roles.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos requeridos.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      return;
    }
    if (!reseller) {
      createUser(formValues);
    } else {
      updateUser(reseller.id, formValues);
    }
  };

  return {
    formValues,
    loading,
    texts,
    roles,
    handleChange,
    handleSubmit,
    handleDateChange
  };
};
