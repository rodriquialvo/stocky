import { FC } from 'react';
import { useLoginController } from './Login.controller';
import { LoginProps } from './interfaces';
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

export const LoginPage: FC<
  LoginProps
> = props => {
  const { useController = useLoginController } = props;
  const controller = useController();

  // Render
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box
        className="mx-4 w-full max-w-md p-8 space-y-6"
        bg="white"
        shadow="lg"
        borderRadius="xl"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={controller.handleSubmit} className="space-y-4">
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
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={controller.password}
              onChange={(e) => controller.setPassword(e.target.value)}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
};
