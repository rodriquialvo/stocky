import { Box, Image, Text, Badge, Stack, Button, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { capitalizeFirstLetter } from '../../utils/functions';

export interface GalleryItemProps {
  name: string;
  price: string;
  availability: boolean;
  images: string[];
  onClick?: () => void;
  brand: string;
  code: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ name, price, availability, images, onClick, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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
      alignItems="start"
      transition="transform 0.3s" // Transición suave
      _hover={{ transform: { base: 'none', md: 'scale(1.05)' }, cursor: 'pointer' }} // Efecto hover solo en pantallas medianas y grandes 
    >
      <Box position="relative" width="full" height="96">
        <Image
          src={images[currentIndex]}
          alt={name}
          className="w-full h-full object-cover"
          onClick={onClick}
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

      <Box p="6" pb={2} className="text-left">
        <Heading
          fontSize={"md"}
        >{capitalizeFirstLetter(name)}</Heading>

        <Text fontSize="lg" color="gray.600">
          Marca: {capitalizeFirstLetter(props?.brand)}
        </Text>
        <Text fontSize="lg" color="gray.600">
         Artículo: {props?.code}
        </Text>
        <Text fontWeight="bold" fontSize="lg" color="pink.500">
          {price}
        </Text>
        <Stack direction="row" align="left" justify="left">
          <Text
            color={availability ? 'green.500' : 'red.500'}
          >{availability ? 'Disponible' : 'No disponible'}</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default GalleryItem;
