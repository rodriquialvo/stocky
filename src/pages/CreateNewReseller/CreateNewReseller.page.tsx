import { Box, Button, FormControl, FormLabel, Heading, Input, Select, useBreakpointValue, VStack, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { RoleAction } from '../../store/roles/actions';
import { useRoleStore } from '../../store/roles/slice';
import { UserAction } from '../../store/users/actions';
import { useCreateNewResellerController } from './CreateNewReseller.controller';
import { CreateNewResellerProps } from './interfaces';

export const CreateNewResellerPage: FC<
  CreateNewResellerProps
> = props => {
  const toast = useToast();

  const { getRoles } = RoleAction();
  const { createUser } = UserAction();
  const roles = useRoleStore(state => state.roles);

  const { useController = useCreateNewResellerController } = props;
  const controller = useController();
  const padding = useBreakpointValue({ base: '4', md: '6' });
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });

  useEffect(() => {
    // TODO: limitar estos gets al ingresar a las paginas, mucho consumo
    getRoles();
  }, []);

  const [formValues, setFormValues] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    roles: [],
    address: '',
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
    console.log('Datos del formulario:', formValues);
    createUser(formValues);
    // Aquí puedes añadir lógica para enviar los datos a la API o manejar los datos
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
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        // manejar el envío del formulario aquí
      }}
    >
      <VStack spacing={4} width="100%">
        <Heading fontSize={headingSize} fontWeight="bold" mb={6} textAlign="center">
          Nuevo Revendedor/a
        </Heading>

        <FormControl isRequired>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input id="name" name="name" placeholder="Introduce el nombre" onChange={handleChange} value={formValues.name} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="lastname">Apellido</FormLabel>
          <Input id="lastname" name="lastname" placeholder="Introduce el apellido" onChange={handleChange} value={formValues.lastname} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="email">Correo electrónico</FormLabel>
          <Input type="email" id="email" name="email" placeholder="Introduce el correo electrónico" onChange={handleChange} value={formValues.email} />
        </FormControl>

        <FormControl isRequired>
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
        </FormControl>

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

        <Button type="submit" colorScheme="blue" width="full" mt={4} onClick={handleSubmit}>
          Añadir Revendedor/a
        </Button>
      </VStack>
    </Box>
  );
};
