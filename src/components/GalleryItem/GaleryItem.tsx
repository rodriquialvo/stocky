import { Box, Image, Text, Badge, Stack, Button, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { capitalizeFirstLetter } from '../../utils/functions';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

  return (
    <Box
      className="bg-white shadow-md overflow-hidden"
      width="100%"
      maxW="sm"
      borderWidth="1px"
      display="flex"
      flexDirection="column"
      alignItems="start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="transform 0.3s" // Transición suave
      _hover={{ cursor: 'pointer' }} // Efecto hover solo en pantallas medianas y grandes 
      opacity={isHovered ? .9 : 1}
    >
      <Box position="relative" width="full" height="96">
        <Box height={"100%"}  >
          <Image
            src={images[currentIndex]}
            alt={name}
            className="w-full h-full object-cover"
            onClick={onClick}
          />
          <Box alignContent={"center"}  display={"flex"}   position="absolute" bottom={2} left={2}>
            <Text fontWeight={"bold"} fontSize={"sm"} px={1} bg={"#ec0868"} color={"white"}  >-30% a partir de 2da pieza 🔥</Text>
          </Box>
        </Box>

        {/* Botones para navegar entre imágenes */}
        {isHovered && (
          <IconButton
            aria-label="Previous Image"
            icon={<ChevronLeftIcon h={6} w={6} />}
            position="absolute"
            left="10px"
            top="45%"
            onClick={handlePrev}
            animation={`${fadeIn} 0.5s ease-in-out`}
            bg="transparent"
            _hover={{ color: "pink.500" }}
            _active={{ bg: "transparent" }}
          />
        )}

        {isHovered && (
          <IconButton
            aria-label="Next Image"
            icon={<ChevronRightIcon h={6} w={6} />}
            position="absolute"
            right="10px"
            top="45%"
            onClick={handleNext}
            animation={`${fadeIn} 0.5s ease-in-out`}
            bg="transparent"
            _active={{ bg: "transparent" }}
            _hover={{ color: "pink.500" }}
          />
        )}
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
