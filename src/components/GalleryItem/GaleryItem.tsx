import { Box, Image, Text, Badge, Stack, IconButton, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
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
  isWholesale: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ name, price, availability, images, onClick, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  `;

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const priceColor = useColorModeValue('pink.500', 'pink.300');

  return (
    <Box
      // bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      width="100%"
      maxW="sm"
      display="flex"
      flexDirection="column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="all 0.3s"
      _hover={{ 
        cursor: 'pointer',
        shadow: 'lg',
        borderColor: 'pink.200'
      }}
      onClick={onClick}
    >
      <Box position="relative" width="full" paddingTop="100%" overflow="hidden">
        <Image
          src={images[currentIndex]}
          alt={name}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: 'scale(1.05)' }}
        />
        
        {props?.isWholesale && (
          <Badge
            position="absolute"
            bottom={2}
            left={2}
            px={2}
            py={1}
            bg="pink.500"
            color="white"
            borderRadius="md"
            fontSize="sm"
            fontWeight="bold"
          >
            -30% desde 2da pieza 🔥
          </Badge>
        )}

        {isHovered && images.length > 1 && (
          <>
            <IconButton
              aria-label="Previous Image"
              icon={<ChevronLeftIcon h={6} w={6} />}
              position="absolute"
              left={2}
              top="50%"
              // transform="translateY(-50%)"
              onClick={handlePrev}
              size="sm"
              colorScheme="pink"
              variant="solid"
              opacity={0.8}
              _hover={{ opacity: 1 }}
              animation={`${fadeIn} 0.2s ease-in-out`}
            />
            <IconButton
              aria-label="Next Image"
              icon={<ChevronRightIcon h={6} w={6} />}
              position="absolute"
              right={2}
              top="50%"
              // transform="translateY(-50%)"
              onClick={handleNext}
              size="sm"
              colorScheme="pink"
              variant="solid"
              opacity={0.8}
              _hover={{ opacity: 1 }}
              animation={`${fadeIn} 0.2s ease-in-out`}
            />
          </>
        )}
      </Box>

      <Box p={4}>
        <Stack spacing={2}>
          <Heading size="sm" noOfLines={2}>
            {capitalizeFirstLetter(name)}
          </Heading>

          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color={textColor}>
              {capitalizeFirstLetter(props?.brand)}
            </Text>
            <Text fontSize="sm" color={textColor}>
              {props?.code}
            </Text>
          </Flex>

          <Text fontWeight="bold" fontSize="lg" color={priceColor}>
            {price}
          </Text>

          <Badge
            colorScheme={availability ? 'green' : 'red'}
            variant="subtle"
            px={2}
            py={1}
            borderRadius="full"
            textAlign="center"
          >
            {availability ? 'Disponible' : 'No disponible'}
          </Badge>
        </Stack>
      </Box>
    </Box>
  );
};

export default GalleryItem;
