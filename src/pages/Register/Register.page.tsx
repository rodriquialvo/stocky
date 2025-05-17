import { FC, useState } from 'react';
import { useRegisterController } from './Register.controller';
import { RegisterProps } from './interfaces';
import { Box, Button, FormControl, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Link, Text } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import { images } from '../../constants/images';
import { ROUTES } from '../../constants/Routes';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const RegisterPage: FC<
  RegisterProps
> = props => {
  const { useController = useRegisterController } = props;
  const controller = useController();
  const [showPassword, setShowPassword] = useState(false);

  // Render
  return (
    <Box display={{
      base: "inline-block",
      lg: "flex"
    }} alignItems="center" justifyContent="center" height="100vh" width="100vw" bg={"blue.50"}>
      <Box
        display={"flex"}
        shadow={"lg"}
        bg={"white"}
        flexDirection={{
          base: "column",
          lg: "row"
        }}
      >
        <Image w={{
          base: "100%",
          lg: 600
        }} height={"auto"} src={images.logo} alt="Lenceria Marilyn" />
        <Box w={{
          base: "100%",
          lg: 600
        }} px={{
          base: 5,
          lg: 10
        }} py={10} height={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={5}
          overflowY="auto" // Enable vertical scrolling

        >
          <form onSubmit={controller.handleSubmit}  >
            <Heading color={"pink.400"} mb={5}>Te damos la bienvenida a Lenceria Marilyn</Heading>
            <FormControl id="name">
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                value={controller.formData.name}
                name="name"
                onChange={(e) => controller.handleInputChange(e)}
                required
              />
            </FormControl>
            <FormControl id="lastname">
              <FormLabel>Apellido</FormLabel>
              <Input
                type="text"
                value={controller.formData.lastname}
                name='lastname'
                onChange={(e) => controller.handleInputChange(e)}
                required
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={controller.formData.email}
                name='email'
                onChange={(e) => controller.handleInputChange(e)}
                required
              />
            </FormControl>
            <FormControl id="date">
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Input
                type="date"
                name={'birthdate'}
                value={controller.formData.birthdate}
                onChange={(e) => controller.handleInputChange(e)}
                required
              />
            </FormControl>
            <FormControl id="identity">
              <FormLabel>Número de Identidad</FormLabel>
              <Input
                type="number"
                value={controller.formData.dni}
                name='dni'
                onChange={(e) => controller.handleInputChange(e)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={controller.formData.password}
                  name='password'
                  onChange={(e) => controller.handleInputChange(e)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost" // Para que no tenga fondo
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button isLoading={controller.isLoading} mt={5} type="submit" colorScheme="teal" width="full">
              Registrarse
            </Button>
            <Text fontSize={"sm"}>¿ya tienes una cuenta? <Link fontSize={"sm"} color={"pink.500"} href={ROUTES.LOGIN}>Inicia Sesión</Link></Text>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
