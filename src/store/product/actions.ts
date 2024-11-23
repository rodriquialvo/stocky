import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { useAPIProductService } from '../../services/product/product.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { ImageAction } from '../image/actions';
import { useProductStore } from './slice';
import { Product } from '../../services/product/dtos/getProducts';
import toast from 'react-hot-toast';

export const ProductAction = () => {
  const productService = useAPIProductService();

  const setStatus = useProductStore(state => state.setStatus);
  const setProducts = useProductStore(state => state.setProducts);
  const setProduct = useProductStore(state => state.setProduct);
  const setProductsWhitStocks = useProductStore(state => state.setProductsWhitStocks);
  const setProductsByCodeOrName = useProductStore(state => state.setProductsByCodeOrName);
  const setCalculatedPrices = useProductStore(state => state.setCalculatedPrices);
  const setProductsFilters = useProductStore(state => state.setProductsFilters);

  const setProductsSelected = useProductStore(state => state.setProductsSelected);
  const productsSelected = useProductStore(state => state.productsSelected)
  const productsWhitStocks = useProductStore(state => state.productsWhitStocks);
  const products = useProductStore(state => state.products);

  const { createNewImageUrl } = ImageAction()
  const getProducts = async (filters) => {
    setStatus(getStartStatus());
    try {
      const data = await productService.getProducts(filters);
      if (!data.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProducts(data.products);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const createNewProduct = async (body: ProductFormData) => {
    setStatus(getStartStatus());
    try {

      const uploadedUrls = await Promise.all(
        body.pictures.map(element => createNewImageUrl(element))
    );

      const response = await productService.postCreateNewProduct({ ...body, pictures: uploadedUrls.map(url => ({ url, alt_text: body.name + " " + body.code })) });
      if (!response.product) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setCalculatedPrices({});
      setStatus(getSuccessStatus());
      toast.success("Producto creado con éxito")
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getProductDetail = async (id: string) => {
    setStatus(getStartStatus());
    try {
      const response = await productService.getProductDetail(id,{ by: "variant"} );
      if (!response.product) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProduct(response.product);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getProductDetailWhitStockInDropDown = async (id: string) => {
    setStatus(getStartStatus());
    try {
      setStatus(getSuccessStatus());
      if (productsWhitStocks[id]) {
        if (productsWhitStocks[id].lastRequest) {
          const fiveMinutesInMs = 5 * 60 * 1000;
          const now = new Date();
          if ((now as any) - (productsWhitStocks[id].lastRequest as any) > fiveMinutesInMs) {
            const response = await productService.getProductDetail(id);
            if (!response.product) {
              setStatus(getErrorStatus('No response'));
              return;
            }
            setProductsWhitStocks({ ...productsWhitStocks, [id]: { ...response.product, lastRequest: new Date() } });
          }
        }
      } else {
        const response = await productService.getProductDetail(id);
        if (!response.product) {
          setStatus(getErrorStatus('No response'));
          return;
        }
        setProductsWhitStocks({ ...productsWhitStocks, [id]: { ...response.product, lastRequest: new Date() } });
      }
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const getProductsByCodeOrName = async (q: string) => {
    setStatus(getStartStatus());
    try {
      const response = await productService.getProductsByCodeOrName(q);
      if (!response.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setProductsByCodeOrName(response.products);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getCalculatePrices = async ({ costPrice, percentageReseller, percentageRetail }) => {
    setStatus(getStartStatus());
    try {
      const response = await productService.getCalculatePrices({ costPrice, percentageReseller, percentageRetail });
      if (!response.prices) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setCalculatedPrices(response.prices);
      setStatus(getSuccessStatus());
      return response;
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const clearCalculatePrices = () => {
    setCalculatedPrices({ costPrice: 0, reseller: 0, retail: 0 });
  }
  const selectProduct = async (product: Product) => {
    setStatus(getStartStatus());
    try{
      if(!!productsSelected.find(prod => product.id === prod.id)){
        setProductsSelected(productsSelected.filter(prod => prod.id !== product.id ))
      } else {
        setProductsSelected([...productsSelected, product])
      }
    } catch (e) {
    }
  }

  const cleanProductsSelected = () => {
    setProductsSelected([]);
  }

  const selectAllProducts = () => {
    setProductsSelected(products)
  }

  const increasePricesOfProducts = async ({ productsIds, percentageIncrease }: { productsIds: string[], percentageIncrease: number }) => {
    setStatus(getStartStatus());
    try {
      const response = await productService.putIncreasePricesOfProducts({ productsIds, percentageIncrease });
      if (!response.products) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setCalculatedPrices(response.prices);
      setStatus(getSuccessStatus());
      toast.success('Precios aumentados con éxito');
      getProducts({});
      setProductsSelected([]);
      return response;
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  }

  const setProductsFiltersAction = (productsFilters) => {
    setProductsFilters(productsFilters)
  }


  return {
    getProducts,
    createNewProduct,
    getProductDetail,
    getProductDetailWhitStockInDropDown,
    getProductsByCodeOrName,
    getCalculatePrices,
    clearCalculatePrices,
    selectProduct,
    cleanProductsSelected,
    selectAllProducts,
    increasePricesOfProducts,
    setProductsFiltersAction
  };
};
