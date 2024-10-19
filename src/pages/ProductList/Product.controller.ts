import { useEffect, useState } from 'react';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { ProductController } from './interfaces';
import { Product } from '../../services/product/dtos/getProducts';
import { formattedNumberToMoney } from '../../utils/functions';
import { ItemListProductProps } from '../../components/ItemListProduct/interfaces';

export const useProductController =
  (): /* <--Dependency Injections  like services hooks */
    ProductController => {
    const {getProducts, getProductDetailWhitStockInDropDown} = ProductAction()
    const products = useProductStore(state => state.products)
    
    
    useEffect(() => {
      getProducts()
    },[])

    const mapProductsViewModel = (product: Product): ItemListProductProps => {
      return {
        name: product?.name,
        brand: product?.attributes?.brand,
        code: product?.code,
        hasStock: product?.hasStock,
        id: product?.id,
        onClick: () => getProductDetailWhitStockInDropDown(product?.id)
      }
    } 
    return {
      productsViewModel: products.map(mapProductsViewModel)
    };
  };
