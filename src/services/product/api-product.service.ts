import { ProductFormData } from '../../pages/CreateNewProduct/interfaces';
import { useSessionStore } from '../../store/session/slice';
import Http from '../http';
import { GetProductAtributesResponse } from './dtos/getProductAtributes';
import { GetProductDetailWhitStocksResponse } from './dtos/getProductDetail';
import { GetProductsResponse } from './dtos/getProducts';
import { PostProductResponse } from './dtos/postCreateNewProduct';
import { ProductService } from './product.service';

// Datos mockeados para pruebas
const mockProductDetail = {
  id: "123",
  name: "Remera Básica",
  description: "Remera básica de algodón premium",
  code: "REM-001",
  categories: ["Ropa", "Remeras"],
  attributes: {
    brand: "Stocky"
  },
  pictures: [
    {
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt_text: "Remera Básica - Vista Frontal"
    },
    {
      url: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt_text: "Remera Básica - Vista Trasera"
    }
  ],
  prices: {
    retail: 2500,
    reseller: 1800,
    cost: 1200
  },
  hasStock: true,
  stocks: [
    {
      id: "1",
      quantity: 100,
      variant: {
        id: "v1",
        color: "Negro",
        size: "S"
      },
      costPrice: 1200,
      date: new Date()
    },
    {
      id: "2",
      quantity: 150,
      variant: {
        id: "v2",
        color: "Negro",
        size: "M"
      },
      costPrice: 1200,
      date: new Date()
    },
    {
      id: "3",
      quantity: 80,
      variant: {
        id: "v3",
        color: "Blanco",
        size: "S"
      },
      costPrice: 1200,
      date: new Date()
    }
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: ["Negro", "Blanco", "Gris"],
  wholesaleData: {
    isWholesaler: true,
    minimumQuantity: 6
  }
};

export class ApiProductService implements ProductService {
  private http: Http;
  private basicToken = useSessionStore(state => state.basicToken);

  constructor() {
    this.http = new Http(this.basicToken, 'products');
  }

  getProducts = (params?) => this.http.get<GetProductsResponse>('filter', params);

  postCreateNewProduct = (body: ProductFormData) => this.http.post<PostProductResponse>('', body);

  getProductDetail = async (id: string, param?: {by?:string} ): Promise<GetProductDetailWhitStocksResponse> => {
    // Para pruebas, retornamos los datos mockeados
    return {
      product: mockProductDetail
    };
  };

  getProductsByCodeOrName = (q: string) => this.http.get<GetProductsResponse>('filter/products-by-code-or-name', {q});

  getProductAtributes = (params?: {type?: string}) => this.http.get<GetProductAtributesResponse>('', params);

  getCalculatePrices = (params: any) => this.http.get<GetProductAtributesResponse>('calculations/prices', params);

  putIncreasePricesOfProducts = (data: {productsIds: string[], percentageIncrease: number}) => this.http.put<GetProductAtributesResponse>('prices/increase', data);

  updateProduct = (id: string, body: ProductFormData) => this.http.put<PostProductResponse>(id, body);
}
