import React, { useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement, Box, Spinner, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  onSearch: (query: string) => void; // Función que se ejecutará al buscar
  placeholder?: string; // Placeholder personalizado
  debounceTime?: number; // Tiempo de espera antes de buscar
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Buscar...",
  debounceTime = 1500,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // Valor del input
  const [isLoading, setIsLoading] = useState(false); // Indicador de carga

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        onSearch(searchTerm);
        setIsLoading(false);
      }, debounceTime);

      return () => clearTimeout(timeout); // Limpiar el timeout si el usuario sigue escribiendo
    } else if (searchTerm.length < 3) {
      setIsLoading(false);
      onSearch(""); // Llamar con una búsqueda vacía si no hay suficientes caracteres
    }
  }, [searchTerm, debounceTime]);

  return (
    <Box width={"100%"} maxW={{
      base: "50%",
      lg: "60%"
    }}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          variant="outline"
          focusBorderColor="blue.500"
          borderRadius="md"
          size="md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement onClick={() => setSearchTerm("")} cursor="pointer">
          x
        </InputRightElement>
      </InputGroup>
      {isLoading && (
        <Box mt={2} textAlign="center">
          <Spinner size="sm" color="blue.500" />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
