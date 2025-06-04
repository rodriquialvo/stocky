import { Box, Button, FormControl, FormLabel, Heading, Input, Select, useBreakpointValue, VStack, useToast, Checkbox, Flex, Text, Container, Card, CardBody, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { useCreateNewResellerController } from './CreateNewReseller.controller';
import { CreateNewResellerProps } from './interfaces';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';

export const CreateNewResellerPage: FC<CreateNewResellerProps> = props => {
  const { useController = useCreateNewResellerController } = props;
  const controller = useController();
  const {
    formValues,
    loading,
    texts,
    roles,
    handleChange,
    handleSubmit,
    handleDateChange
  } = controller;
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });

  return (
    <Container maxW="container.xl" py={8}>
      <style>
        {`
          .date-picker-wrapper {
            width: 100%;
          }
          .date-picker-wrapper input {
            width: 100%;
            padding: 8px;
            border: none;
          }
        `}
      </style>
      <Card
        width="100%"
        maxWidth="1000px"
        mx="auto"
        bg="white"
        borderRadius="xl"
        boxShadow="2xl"
        overflow="hidden"
      >
        <CardBody p={{ base: 6, md: 8 }}>
          <VStack spacing={6} width="100%">
            <Heading
              fontSize={headingSize}
              fontWeight="bold"
              mb={8}
              textAlign="center"
              color="blue.600"
              borderBottom="2px solid"
              borderColor="blue.200"
              pb={4}
            >
              {texts.title}
            </Heading>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} width="100%">
              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="birthdate" fontWeight="medium" color="gray.700">Fecha de nacimiento</FormLabel>
                  <Box
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={2}
                    _hover={{ borderColor: "blue.400" }}
                  >
                    <DatePicker
                      locale={es}
                      onChange={handleDateChange}
                      name="birthdate"
                      selected={formValues.birthdate}
                      dateFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      wrapperClassName="date-picker-wrapper"
                    />
                  </Box>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="dni" fontWeight="medium" color="gray.700">DNI</FormLabel>
                  <Input
                    id="dni"
                    name="dni"
                    placeholder="Introduce el DNI"
                    onChange={handleChange}
                    value={formValues.dni}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="name" fontWeight="medium" color="gray.700">Nombre</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Introduce el nombre"
                    onChange={handleChange}
                    value={formValues.name}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="lastname" fontWeight="medium" color="gray.700">Apellido</FormLabel>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Introduce el apellido"
                    onChange={handleChange}
                    value={formValues.lastname}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="email" fontWeight="medium" color="gray.700">Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Introduce el correo electrónico"
                    onChange={handleChange}
                    value={formValues.email}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="phone" fontWeight="medium" color="gray.700">Número de Teléfono</FormLabel>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Introduce el número de teléfono"
                    maxLength={12}
                    onChange={handleChange}
                    value={formValues.phone}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="address" fontWeight="medium" color="gray.700">Dirección</FormLabel>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Introduce la dirección"
                    onChange={handleChange}
                    value={formValues.address}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel htmlFor="roles" fontWeight="medium" color="gray.700">Rol</FormLabel>
                  <Select
                    id="roles"
                    name="roles"
                    placeholder="Selecciona un rol"
                    onChange={handleChange}
                    value={formValues.roles}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
                  >
                    {roles.map(role => (
                      <option key={role.name} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl>
                  <Checkbox
                    id="active"
                    name="active"
                    isChecked={formValues.active}
                    onChange={handleChange}
                    colorScheme="blue"
                    size="lg"
                  >
                    <Text fontWeight="medium" color="gray.700">Activo</Text>
                  </Checkbox>
                </FormControl>
              </GridItem>
            </Grid>

            <Button
              isLoading={loading}
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              mt={8}
              onClick={handleSubmit}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              {texts.button}
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};
