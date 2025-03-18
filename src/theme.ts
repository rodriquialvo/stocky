import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Quicksand, sans-serif', // Fuente moderna y limpia para títulos
    body: 'Quicksand, sans-serif',   // Mantenemos la misma fuente para consistencia
  },
});

export default theme;