import React from 'react';
import { Box, Image, Text, useBreakpointValue } from '@chakra-ui/react';

interface HeroProps {
  images: string[];
}

const Hero: React.FC<HeroProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Cambia de imagen cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <Box position="relative" height="700px" overflow="hidden">
      <Image
        src={images[currentIndex]}
        alt={`Hero Image ${currentIndex + 1}`}
        objectFit="cover"
        width="100%"
        height="100%"
        transition="opacity 0.5s ease-in-out"
        opacity={0.8} // Ajusta la opacidad de la imagen si es necesario
      />
      {/* Superposición oscura */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.5)" // Superposición oscura
        transition="background-color 0.5s ease-in-out"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="white" // Color del texto
        padding="20px"
        borderRadius="md"
        transition="all 0.5s ease-in-out"
      >
        <Text fontSize={useBreakpointValue({ base: 'xl', md: '3xl' })} fontWeight="bold">
          ¡Descubre nuestras Novedades!
        </Text>
        <Text fontSize={useBreakpointValue({ base: 'md', md: 'lg' })} mt={2}>
          Encuentra la mejor selección de ropa interior
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;