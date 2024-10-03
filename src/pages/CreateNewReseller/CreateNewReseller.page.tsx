import React, { FC } from 'react';
import { useCreateNewResellerController } from './CreateNewReseller.controller';
import styles from './CreateNewReseller.module.css'; // Importar el archivo CSS module
import { CreateNewResellerProps } from './interfaces';
import { Box, Button, FormControl, FormLabel, Heading, Input, Textarea, useBreakpointValue, VStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import Modal from '../../components/Modal/Modal';

export const CreateNewResellerPage: FC<
  CreateNewResellerProps
> = props => {
  const { useController = useCreateNewResellerController } = props;
  const controller = useController();
  const padding = useBreakpointValue({ base: '4', md: '6' });
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });
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
      as="form"
    // onSubmit={controller.handleSubmit}
    >
      {/* Heading */}
      <Heading fontSize={headingSize} fontWeight="bold" mb={6} textAlign="center">
        Nuevo Vendedor/a
      </Heading>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            id="name"
            name="name"
            // value={controller.formData.name}
            // onChange={controller.handleChange}
            placeholder="Introduce el nombre"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="lastname">Apellido</FormLabel>
          <Input
            id="lastname"
            name="lastname"
            // value={controller.formData.name}
            // onChange={controller.handleChange}
            placeholder="Introduce el apellido"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="phoneNumber">Número de Teléfono</FormLabel>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            // value={controller.formData.phoneNumber}
            // onChange={controller.handleChange}
            placeholder="Introduce tu número de teléfono"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // Patrón para formato 123-456-7890
            maxLength={12}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="phoneNumber">Correo electronico</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            // value={controller.formData.phoneNumber}
            // onChange={controller.handleChange}
            placeholder="Introduce la direccion de correo electronico"
            maxLength={12}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="birthDate">Fecha de Nacimiento</FormLabel>
          <Input
            type="date"
            id="birthDate"
            name="birthDate"
            // value={controller.formData.birthDate}
            // onChange={controller.handleChange}
            placeholder="Selecciona tu fecha de nacimiento"
            max={new Date().toISOString().split("T")[0]} // Evita seleccionar una fecha futura
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="address">Domicilio</FormLabel>
          <Input
            id="address"
            name="address"
            placeholder="Introduce tu dirección"
          // value={controller.formData.address} // Si estás usando controladores
          // onChange={controller.handleChange}  // Si estás manejando eventos
          />
        </FormControl>


        {/* Submit Button */}
        <Button type="submit" colorScheme="blue" width="full" mt={4}>
          Añadir Producto
        </Button>
      </VStack>

      {/* Modals */}
      {/* <Modal title="Nueva Marca" onSubmit={controller.addBrand} isOpen={controller.isBrandOpen} onClose={controller.onBrandClose}>
        <Input
          placeholder="Nueva Marca"
          value={controller.newBrand}
          onChange={(e) => controller.setNewBrand(e.target.value)}
        />
      </Modal>

      <Modal title="Añadir Talle" onSubmit={controller.addSize} isOpen={controller.isSizeOpen} onClose={controller.onSizeClose}>
        <Input
          placeholder="Nuevo Talle"
          value={controller.newSize}
          onChange={(e) => controller.setNewSize(e.target.value)}
        />
      </Modal>

      <Modal title="Añadir Color" onSubmit={controller.addColor} isOpen={controller.isColorOpen} onClose={controller.onColorClose}>
        <Input
          placeholder="Nuevo Color"
          value={controller.newColor}
          onChange={(e) => controller.setNewColor(e.target.value)}
        />
      </Modal> */}
    </Box>
  );
};
