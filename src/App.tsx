import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { LoginPage } from './pages/Login/Login.page';
import { ProductList } from './pages/ProductList/ProductList';
import { useSessionStore } from './store/session/slice';
import {ROUTES} from './constants/Routes';
import AddProduct from './components/AddProduct/AddProduct';
function App() {
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  console.log({ userIsAuthenticated });
  return (
    <BrowserRouter>
      {/* <Box display="flex"> */}
      {/* Contenido principal */}

      <Routes>
        <Route path={ROUTES.LOGIN} element={userIsAuthenticated ? <Navigate to={ROUTES.STOCK_LIST} /> : <LoginPage />} />

        <Route path={ROUTES.STOCK_LIST} element={
          <ProtectedRoute >
            <ProductList />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.ADD_STOCK} element={
          <ProtectedRoute >
            <AddProduct />
          </ProtectedRoute>
        } />
        {/* <Route path="/stock/add" element={<h1>Ingreso de Stock</h1>} />
          <Route path="/resellers/list" element={<h1>Lista de Revendedores</h1>} />
          <Route path="/resellers/new" element={<h1>Nuevo Revendedor</h1>} />
          <Route path="/resellers/metrics" element={<h1>Métricas de Revendedores</h1>} /> */}
      </Routes>

      {/* </Box> */}
    </BrowserRouter >
  );
}

export default App;
