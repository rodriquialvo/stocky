import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Sidebar } from './components/Sidebar/Sidebar';
import { LoginPage } from './pages/Login/Login.page';
import { ProductList } from './pages/ProductList/ProductList';
import { useUsersStore } from './store/session/slice';
import { Box } from '@chakra-ui/react';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  const userIsAuthenticated = useUsersStore(state => state.isAuthenticated);

  return (
    <BrowserRouter>
      {/* <Box display="flex"> */}
      {/* Contenido principal */}

      <Routes>
        <Route path="/login" element={userIsAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />

        <Route path='/home' element={
          <ProtectedRoute isAuthenticated={!!userIsAuthenticated}>
            <Box
              as="main"
              flex="1"
              ml={isSidebarExpanded ? "250px" : "70px"} // Ajustamos el margen izquierdo dinámicamente
              p={4}
              transition="margin-left 0.3s ease"
              padding={0}
            >
              <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
              <ProductList isSidebarExpanded={isSidebarExpanded} />
            </Box>
            {/* <Route path="/stock/list" Component={ProductList} />
              <Route path="/stock/add" element={<h1>Ingreso de Stock</h1>} />
              <Route path="/resellers/list" element={<h1>Lista de Revendedores</h1>} />
              <Route path="/resellers/new" element={<h1>Nuevo Revendedor</h1>} />
              <Route path="/resellers/metrics" element={<h1>Métricas de Revendedores</h1>} /> */}
          </ProtectedRoute>
        } />
      </Routes>

      {/* </Box> */}
    </BrowserRouter >
  );
}

export default App;
