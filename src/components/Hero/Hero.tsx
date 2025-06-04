import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Hero: React.FC = () => {
  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl", lg: "4xl" });
  const subheadingSize = useBreakpointValue({ base: "md", md: "lg" });
  
  return (
    <Box
      position="relative"
      height={{ base: "60vh", md: "70vh" }}
      overflow="hidden"
      background="linear-gradient(135deg, #fce7f3 0%, #fff 100%)"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 150%, #fbcfe8 0%, transparent 50%)",
      }}
    >
      {/* Elementos decorativos */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="20px"
        height="20px"
        borderRadius="full"
        bg="pink.200"
        opacity="0.5"
        animation={`${fadeIn} 1s ease-out 0.5s forwards`}
      />
      <Box
        position="absolute"
        bottom="15%"
        right="10%"
        width="30px"
        height="30px"
        borderRadius="full"
        bg="pink.100"
        opacity="0.7"
        animation={`${fadeIn} 1s ease-out 0.7s forwards`}
      />
      
      <Container maxW="container.xl" height="100%">
        <VStack
          height="100%"
          justify="center"
          align="center"
          spacing={6}
          textAlign="center"
          px={{ base: 4, md: 0 }}
        >
          <Heading
            as="h1"
            size={headingSize}
            fontFamily="'Cormorant Garamond', serif"
            color="gray.800"
            animation={`${fadeIn} 1s ease-out`}
            letterSpacing="wide"
          >
            Lencería Marilyn
          </Heading>
          
          <Text
            fontSize={subheadingSize}
            color="gray.600"
            maxW="xl"
            animation={`${fadeIn} 1s ease-out 0.3s forwards`}
            opacity="0"
            lineHeight="tall"
          >
            Descubre nuestra exclusiva colección de lencería que combina elegancia, comodidad y sensualidad
          </Text>

          {/* Elemento decorativo adicional */}
          <Box
            width="60px"
            height="2px"
            bg="pink.400"
            mt={4}
            animation={`${fadeIn} 1s ease-out 0.6s forwards`}
            opacity="0"
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;
