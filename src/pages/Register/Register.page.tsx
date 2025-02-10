import { FC } from 'react';
import { useRegisterController } from './Register.controller';
import { RegisterProps } from './interfaces';
import { Box, Button, FormControl, FormLabel, Heading, Image, Input, Link, Text } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import { images } from '../../constants/images';
import { ROUTES } from '../../constants/Routes';

export const RegisterPage: FC<
  RegisterProps
> = props => {
  const { useController = useRegisterController } = props;
  const controller = useController();

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
        <form  >
          <Box w={{
            base: "100%",
            lg: 600
          }} px={{
            base: 5,
            lg: 10
          }} py={10} height={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={5}
          overflowY="auto" // Enable vertical scrolling

          >
            <Heading color={"pink.400"} mb={5}>Te damos la bienvenida a Lenceria Marilyn</Heading>
            <FormControl id="name">
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                // value={controller.email}
                // onChange={(e) => controller.setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="lastname">
              <FormLabel>Apellido</FormLabel>
              <Input
                type="text"
                // value={controller.email}
                // onChange={(e) => controller.setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                // value={controller.email}
                // onChange={(e) => controller.setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                // value={controller.password}
                // onChange={(e) => controller.setPassword(e.target.value)}
                required
              />
            </FormControl>

            <Button  type="submit" colorScheme="teal" width="full">
              Registrarse
            </Button>
            <Text alignSelf={"center"}>ó</Text>
            <GoogleLogin
              onSuccess={() => console.log('Login Success')}
              onError={() => console.log('Login Failed')}
              size="large"
            />
            <Text fontSize={"sm"}>¿ya tienes una cuenta? <Link fontSize={"sm"} color={"pink.500"} href={ROUTES.LOGIN}>Inicia Sesión</Link></Text>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
