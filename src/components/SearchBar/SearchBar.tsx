import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const inputSize = useBreakpointValue({ base: "sm", md: "md" });
  const inputWidth = useBreakpointValue({ base: "100%", md: "40%" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <InputGroup size={inputSize} w={inputWidth}>
      <InputLeftElement pointerEvents="none">
        <FiSearch color="#ec0868" />
      </InputLeftElement>
      <Input
        placeholder="Buscar productos..."
        value={query}
        onChange={handleChange}
        borderColor="gray.300"
        _hover={{ borderColor: "pink.300" }}
        _focus={{ borderColor: "#ec0868" }}
        borderRadius="full"
      />
    </InputGroup>
  );
};

export default SearchBar;
