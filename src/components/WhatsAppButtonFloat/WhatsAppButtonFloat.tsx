import { Box, Link } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <Box
      as={Link}
      href="https://wa.me/+5493516540351" // Reemplaza con tu número de WhatsApp
      isExternal
      position="fixed"
      bottom="150px"
      right="20px"
      bg="green.500"
      color="white"
      width="60px"
      height="60px"
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="lg"
      _hover={{ bg: "green.600" }}
      zIndex={11}
    >
      <FaWhatsapp size="30px" />
    </Box>
  );
};

export default WhatsAppButton;
