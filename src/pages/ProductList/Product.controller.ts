import { useEffect, useState } from 'react';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { ProductController } from './interfaces';

export const useProductController =
  (): /* <--Dependency Injections  like services hooks */
    ProductController => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0); // Ajustado dinámicamente
    const [totalPages, setTotalPages] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const { getProducts } = ProductAction();
    const products: any = useProductStore(state => state.products);
    const total: any = useProductStore(state => state.total);

    useEffect(() => {
      // Ajustar dinámicamente los items por página
      const updateItemsPerPage = () => {
        const rowHeight = 41; // Altura estimada de una fila
        const availableHeight = window.innerHeight - 120; // Espacio restante entre el header y paginado
        const visibleRows = Math.floor(availableHeight / rowHeight);
        setItemsPerPage(visibleRows);
      };

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Determinar si la pantalla es mobile
      };
      updateItemsPerPage();
      handleResize();
      setCurrentPage(1);

      window.addEventListener('resize', updateItemsPerPage);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', updateItemsPerPage);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // useEffect(() => {
    //   if (!itemsPerPage) return;
    //   getProducts(currentPage, itemsPerPage);
    // }, [currentPage]);

    useEffect(() => {
      if (!total && !itemsPerPage) return;
      setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);

    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Return state and events
    return {
      currentPage,
      itemsPerPage,
      isMobile,
      products,
      total,
      totalPages,
      handlePrevPage,
      handleNextPage
    };
  };
