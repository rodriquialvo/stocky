import { Box, Button, FormControl, FormLabel, Heading, Input, Select, useBreakpointValue, VStack, useToast, Checkbox, Flex, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { RoleAction } from '../../store/roles/actions';
import { useRoleStore } from '../../store/roles/slice';
import { UserAction } from '../../store/users/actions';
import { useCreateNewResellerController } from './CreateNewReseller.controller';
import { CreateNewResellerProps } from './interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/users/slice';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
export const CreateNewResellerPage: FC<
  CreateNewResellerProps
> = props => {
  const toast = useToast();
  const navigate = useNavigate();

  const location = useLocation();
  const reseller = location.state?.reseller;

  const texts = {
    title: reseller ? 'Editar Revendedor' : 'Crear revendedor',
    button: reseller ? 'Guardar cambios' : 'Crear revendedor',
  }

  const { createOrUpdateStatus } = useUserStore(state => state);
  const { createUser, updateUser, clearCreateOrUpdateStatus } = UserAction();
  const roles = useRoleStore(state => state.roles);

  const { useController = useCreateNewResellerController } = props;
  const controller = useController();
  const padding = useBreakpointValue({ base: '4', md: '6' });
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });
  const loading = useUserStore(state => state.status.isFetching);

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
      navigate('/resellers/list');
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

  // Render
  return (
    <Box
      width={{ base: '100%', md: '80%' }}
      maxWidth="900px"
      mx="auto"
      p={padding}
      bg="gray.100"
      borderRadius="lg"
      boxShadow="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <VStack spacing={4} width="100%">
        <Heading fontSize={headingSize} fontWeight="bold" mb={6} textAlign="center">
          {texts.title}
        </Heading>
        <Flex
          width={"100%"}
          gap={4}
        >
          <FormLabel htmlFor="birthdate">Fecha de nacimiento: *</FormLabel>
          <DatePicker
            locale={es}
            onChange={(date: Date) => setFormValues({ ...formValues, birthdate: date })}
            name="birthdate"
            selected={formValues.birthdate}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
          />
        </Flex>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input id="name" name="name" placeholder="Introduce el nombre" onChange={handleChange} value={formValues.name} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="lastname">Apellido</FormLabel>
          <Input id="lastname" name="lastname" placeholder="Introduce el apellido" onChange={handleChange} value={formValues.lastname} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="dni">Dni</FormLabel>
          <Input id="dni" name="dni" placeholder="Introduce el DNI" onChange={handleChange} value={formValues.dni} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Correo electrónico</FormLabel>
          <Input type="email" id="email" name="email" placeholder="Introduce el correo electrónico" onChange={handleChange} value={formValues.email} />
        </FormControl>
        <FormLabel htmlFor="phone">Número de Teléfono</FormLabel>
        <Input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Introduce el número de teléfono"
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          maxLength={12}
          onChange={handleChange}
          value={formValues.phone}
        />
        <FormControl isRequired>
          <FormLabel htmlFor="address">Dirección</FormLabel>
          <Input id="address" name="address" placeholder="Introduce el apellido" onChange={handleChange} value={formValues.address} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="roles">Rol</FormLabel>
          <Select id="roles" name="roles" placeholder="Selecciona un rol" onChange={handleChange} value={formValues.roles}>
            {roles.map(role => (
              <option key={role.name} value={role.id}>
                {role.name}
              </option>
            ))}
          </Select>
        </FormControl>
        {/* add heck with active */}
        <FormControl>
          <FormLabel htmlFor="active">Activo</FormLabel>
          <Checkbox id="active" name="active" isChecked={formValues.active} onChange={handleChange}>
            Activo
          </Checkbox>
        </FormControl>
        <Button isLoading={loading} type="submit" colorScheme="blue" width="full" mt={4} onClick={handleSubmit}>
          {texts.button}
        </Button>
      </VStack>
    </Box>
  );
};
