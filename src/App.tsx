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
import SalesList from './pages/SalesList/SalesList';
import ResellerList from './pages/ResellersList/ResellersList';
import StockEntry from './pages/StockEntry/StockEntry';
import SalesWeek from './pages/SalesWeek/SalesWeek.page';
import SalesAnalyticsPage from './pages/SalesAnalytics/SalesAnalytics.page';
import ScrollToTop from './hooks/ScrollToTop';
import { useEffect } from 'react';
import { CategoryAction } from './store/category/actions';
import { ProductAtributesAction } from './store/product-atributes/actions';
import { RoleAction } from './store/roles/actions';
import { useProductStore } from './store/product/slice';
import { initialStateFilters } from './components/FilterPanel/constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RegisterPage } from './pages/Register/Register.page';
import MonthlySalesSummary from './pages/MonthlySalesSummary/MonthlySalesSummary.page';
import { CheckoutPage } from './pages/Checkout/Checkout.page';

function App() {
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  const { getCategories } = CategoryAction();
  const { getSizes, getSizesTypes, getAllColors, getAllBrands } = ProductAtributesAction();
  const { getRoles } = RoleAction();
  const setProductsFilters = useProductStore(state => state.setProductsFilters);
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);
  const sessionId = useSessionStore(state => state.sessionId);
  const setSessionId = useSessionStore(state => state.setSessionId);

  useEffect(() => {
      getCategories();
      getSizesTypes();
      getSizes();
      getRoles();
      getAllColors();
      getAllBrands();
      setProductsFilters(initialStateFilters)
  }, []);

  useEffect(() => {
    if (!sessionId.length) {
      setSessionId(crypto.randomUUID());
    }
  }, [sessionId]);



  return (
    <GoogleOAuthProvider clientId={"318321636416-2b8qvnqab4815thpf7schcojkv4h4di7.apps.googleusercontent.com"}>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.GALLERY} />} />
          <Route path={ROUTES.LOGIN} element={ isAuthenticated ? <Navigate to={ROUTES.GALLERY} /> : <LoginPage />} />
          <Route path={ROUTES.REGISTER} element={ isAuthenticated ? <Navigate to={ROUTES.GALLERY} /> : <RegisterPage />} />
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
          <Route path={ROUTES.SALES_MONTHLY} element={
            <ProtectedRoute >
              <MonthlySalesSummary />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.CHECKOUT} element={
              <CheckoutPage />
          } />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
