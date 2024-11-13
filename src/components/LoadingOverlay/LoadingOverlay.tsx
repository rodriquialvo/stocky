import { Box, Spinner } from "@chakra-ui/react";

function LoadingOverlay() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="rgba(255, 255, 255, 0.7)" // Fondo semitransparente
      zIndex="1000" // Asegura que esté por encima del contenido
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Box>
  );
}

export default LoadingOverlay;
