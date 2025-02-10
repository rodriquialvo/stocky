import { FC } from 'react';
import { useLoginController } from './Login.controller';
import { LoginProps } from './interfaces';
import { Box, Input, Button, FormControl, FormLabel, Image, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { images } from '../../constants/images';
import { GoogleLogin } from '@react-oauth/google';
import { Route } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';

export const LoginPage: FC<
  LoginProps
> = props => {
  const { useController = useLoginController } = props;
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
        <form onSubmit={controller.handleSubmit} >
          <Box w={{
            base: "100%",
            lg: 600
          }} px={{
            base: 5,
            lg: 10
          }} py={10} height={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={5}>
            <Heading color={"pink.400"} mb={5}>Te damos la bienvenida a Lenceria Marilyn</Heading>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={controller.email}
                onChange={(e) => controller.setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={controller.password}
                onChange={(e) => controller.setPassword(e.target.value)}
                required
              />
            </FormControl>

            <Button isLoading={controller.isLoading} type="submit" colorScheme="teal" width="full">
              Iniciar sesion
            </Button>
            <Text alignSelf={"center"}>ó</Text>
            <GoogleLogin
              onSuccess={() => console.log('Login Success')}
              onError={() => console.log('Login Failed')}
              size="large"
            />
            <Text fontSize={"sm"}>¿Todavia no tienes una cuenta? <Link fontSize={"sm"} color={"pink.500"} href={ROUTES.REGISTER}>Registrate</Link></Text>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
