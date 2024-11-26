import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { LoginPage } from './pages/Login/Login.page';
import { ProductList } from './pages/ProductList/ProductList';
import { useSessionStore } from './store/session/slice';
import { ROUTES } from './constants/Routes';
import CreateNewProduct from './pages/CreateNewProduct/CreateNewProduct.page';
import { CreateNewResellerPage } from './pages/CreateNewReseller/CreateNewReseller.page';
import GalleryPage from './pages/Galery/Galery.page';
import ProductDetailPage from './pages/ProductDetail/ProductDetail.page';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import SalesList from './pages/SalesList/SalesList';
import ResellerList from './pages/ResellersList/ResellersList';
import StockEntry from './pages/StockEntry/StockEntry';
import SalesWeek from './pages/SalesWeek/SalesWeek.page';
import ScrollToTop from './hooks/ScrollToTop';
import { useEffect } from 'react';
import { CategoryAction } from './store/category/actions';
import { ProductAtributesAction } from './store/product-atributes/actions';
import { useProductAtributesStore } from './store/product-atributes/slice';
import { RoleAction } from './store/roles/actions';

function App() {
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  const { getCategories } = CategoryAction();
  const { getSizes, getSizesTypes, getAllColors, getAllBrands } = ProductAtributesAction();
  const { getRoles } = RoleAction();

  useEffect(() => {
    if(userIsAuthenticated) {
      getCategories();
      getSizesTypes();
      getSizes();
      getRoles();
      getAllColors();
      getAllBrands()
    }
  },[userIsAuthenticated])
  return (
    <BrowserRouter>
      {/* <Box display="flex"> */}
      {/* Contenido principal */}
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.HOME} element={userIsAuthenticated ? <Navigate to={ROUTES.GALLERY} /> : <LoginPage />} />
        <Route path={ROUTES.SHOPPING_CART} element={
          <ProtectedRoute >
            <ShoppingCart />
          </ProtectedRoute>
        } />
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
        <Route path={ROUTES.RESSELLERS_LIST} element={
          <ProtectedRoute >
            <ResellerList />
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
        <Route path={ROUTES.STOCK_ENTRY} element={
          <ProtectedRoute >
            <StockEntry />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.PRODUCT_DETAILS(':id')} element={
          <ProtectedRoute >
            <ProductDetailPage />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.SALES_LIST} element={
          <ProtectedRoute >
            <SalesList />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.SALES_WEEK} element={
          <ProtectedRoute >
            <SalesWeek />
          </ProtectedRoute>
        } />
      </Routes>

      {/* </Box> */}
    </BrowserRouter >
  );
}

export default App;
