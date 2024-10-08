import { Box, Image, Text, Badge, Stack, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface GalleryItemProps {
  name: string;
  price: string;
  availability: string;
  images: string[]; // Cambiado a un array de imágenes
}

const GalleryItem: React.FC<GalleryItemProps> = ({ name, price, availability, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box
      className="bg-white shadow-md rounded-lg overflow-hidden"
      width="100%"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      transition="transform 0.3s" // Transición suave
      _hover={{ transform: { base: 'none', md: 'scale(1.05)' } }} // Efecto hover solo en pantallas medianas y grandes
    >
      <Box position="relative" width="full" height="96">
        <Image
          src={images[currentIndex]}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Botones para navegar entre imágenes */}
        <Button 
          onClick={handlePrev} 
          position="absolute" 
          left={2} 
          top="50%" 
          transform="translateY(-50%)"
          colorScheme="teal" // Personaliza el color del botón
        >
          &#8249; {/* Ícono de flecha izquierda */}
        </Button>
        
        <Button 
          onClick={handleNext} 
          position="absolute" 
          right={2} 
          top="50%" 
          transform="translateY(-50%)"
          colorScheme="teal" // Personaliza el color del botón
        >
          &#8250; {/* Ícono de flecha derecha */}
        </Button>
      </Box>

      <Box p="6" className="text-center">
        <Box className="font-bold text-lg mb-2" as="h4">
          {name}
        </Box>

        <Text fontSize="lg" color="gray.600" className="mb-2">
          {price}
        </Text>

        <Stack direction="row" align="center" justify="center">
          <Badge
            className={`py-1 px-3 rounded-full ${
              availability === 'In Stock' ? 'bg-green-500' : availability === 'Limited Stock' ? 'bg-yellow-500' : 'bg-red-500'
            } text-white`}
          >
            {availability}
          </Badge>
        </Stack>
      </Box>
    </Box>
  );
};

export default GalleryItem;
