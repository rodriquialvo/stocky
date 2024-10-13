import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { LoginPage } from './pages/Login/Login.page';
import { ProductList } from './pages/ProductList/ProductList';
import { useSessionStore } from './store/session/slice';
import {ROUTES} from './constants/Routes';
import CreateNewProduct from './pages/CreateNewProduct/CreateNewProduct.page';
import { CreateNewResellerPage } from './pages/CreateNewReseller/CreateNewReseller.page';
import GalleryPage from './pages/Galery/Galery.page';
import ProductDetailPage from './pages/ProductDetail/ProductDetail.page';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Componente principal de la aplicación
 * 
 * Este componente se encarga de renderizar
 * las rutas de la aplicación y de autenticar
 * al usuario.
 * 
 * Se utiliza el hook useSessionStore para 
 * obtener el estado de autenticación del usuario
 * y mostrar el login o el contenido principal
 * según sea el caso.
 * 
 * El contenido principal se renderiza en un
 * componente Box con un display flex.
 * 
 * Se utiliza el componente ProtectedRoute para
 * proteger las rutas que requieren autenticación
 * y mostrar el login en caso de no estar autenticado.
 * 
 * @returns Un JSX Element con el contenido principal
 *          de la aplicación y las rutas configuradas.
 */
/******  71592864-ffe3-4f6c-8318-8a7efa937a71  *******/function App() {
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  return (
    <BrowserRouter>
      {/* <Box display="flex"> */}
      {/* Contenido principal */}

      <Routes>
        <Route path={ROUTES.HOME} element={userIsAuthenticated ? <Navigate to={ROUTES.GALLERY} /> : <LoginPage />} />

        <Route path={ROUTES.STOCK_LIST} element={
          <ProtectedRoute >
            <ProductList />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.NEW_PRODUCT} element={
          <ProtectedRoute >
            <CreateNewProduct />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.NEW_RESELLER} element={
          <ProtectedRoute >
            <CreateNewResellerPage />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.GALLERY} element={
          <ProtectedRoute >
            <GalleryPage />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.PRODUCT_DETAILS} element={
          <ProtectedRoute >
            <ProductDetailPage />
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
