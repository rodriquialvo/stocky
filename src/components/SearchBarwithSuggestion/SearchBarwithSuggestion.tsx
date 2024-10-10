import React, { useState } from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Box,
  VStack,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBarWithSuggestions: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  // Ejemplo de datos a filtrar (esto puede venir de una API)
  const data = ['Bra', 'Panties', 'Lingerie Set', 'Accessories', 'Stockings', 'Nightwear'];

  // Maneja el cambio de input y filtra los resultados en tiempo real
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filtrar los resultados en base al input del usuario
    if (value.trim() !== '') {
      const filtered = data.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <Box w="100%" maxW="500px" mx="auto" position="relative">
      <InputGroup>
        <Input
          value={query}
          onChange={handleSearch}
          placeholder="Search for lingerie..."
          bg="gray.100"
          border="none"
          borderRadius="full"
          _focus={{ bg: 'white', borderColor: 'pink.200' }}
        />
        <InputRightElement>
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            variant="ghost"
            colorScheme="pink"
          />
        </InputRightElement>
      </InputGroup>

      {/* Sugerencias mostradas debajo del campo de búsqueda */}
      {filteredResults.length > 0 && (
        <Box
          mt={2}
          bg="white"
          shadow="md"
          borderRadius="md"
          maxH="200px"
          overflowY="auto"
          position="absolute"
          w="100%"
          zIndex={10}
        >
          <VStack spacing={2} align="start" p={2}>
            <List spacing={3} w="100%">
              {filteredResults.map((result, index) => (
                <ListItem
                  key={index}
                  px={4}
                  py={2}
                  _hover={{ bg: 'pink.100', cursor: 'pointer' }}
                  borderRadius="md"
                >
                  <Text>{result}</Text>
                </ListItem>
              ))}
            </List>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default SearchBarWithSuggestions;
