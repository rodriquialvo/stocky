import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About/About';
import { ProductList } from './pages/ProductList/ProductList';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

  return (
    <BrowserRouter>
      <Box display="flex">
        {/* Sidebar, pasamos la función para manejar el estado de expansión */}
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

        {/* Contenido principal */}
        <Box
          as="main"
          flex="1"
          ml={isSidebarExpanded ? "250px" : "70px"} // Ajustamos el margen izquierdo dinámicamente
          p={4}
          transition="margin-left 0.3s ease"
          padding={0}
        >
          <Routes>
            <Route path="/stock/list" Component={ProductList} />
            <Route path="/stock/add" element={<h1>Ingreso de Stock</h1>} />
            <Route path="/resellers/list" element={<h1>Lista de Revendedores</h1>} />
            <Route path="/resellers/new" element={<h1>Nuevo Revendedor</h1>} />
            <Route path="/resellers/metrics" element={<h1>Métricas de Revendedores</h1>} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
