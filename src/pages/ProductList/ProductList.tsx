import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  vendorPrice: number;
  publicPrice: number;
}

export const ProductList = ({ isSidebarExpanded }: { isSidebarExpanded: boolean }) => {
  const products: Product[] = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      id: i + 1,
      name: `Product ${i + 1}`,
      description: 'Description',
      brand: 'Brand',
      price: 10.99,
      stock: 10,
      category: 'Category',
      vendorPrice: 9.99,
      publicPrice: 8.99,
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Ajustado dinámicamente
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ajustar dinámicamente los items por página
    const updateItemsPerPage = () => {
      const rowHeight = 41; // Altura estimada de una fila
      const availableHeight = window.innerHeight - 120; // Espacio restante entre el header y paginado
      const visibleRows = Math.floor(availableHeight / rowHeight);
      console.log(visibleRows)
      setItemsPerPage(visibleRows);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Determinar si la pantalla es mobile
    };

    updateItemsPerPage();
    handleResize();

    window.addEventListener('resize', updateItemsPerPage);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentProducts = products.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (isSidebarExpanded && isMobile) {
    return null;
  }


  return (
    <Box className="p-4 relative min-h-screen">
      {/* Tabla para pantallas grandes */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Vendor Price</th>
              <th className="px-4 py-2">Public Price</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">{product.brand}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.vendorPrice}</td>
                <td className="px-4 py-2">{product.publicPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formato en tarjetas para pantallas pequeñas */}
      <div className="block lg:hidden mb-20">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg mb-4 p-4 shadow-sm bg-white"
          >
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Vendor Price:</strong> {product.vendorPrice}</p>
            <p><strong>Public Price:</strong> {product.publicPrice}</p>
          </div>
        ))}
      </div>

      {/* Paginado al final de la pantalla */}
      <Box className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <Stack direction="row" spacing={4} align="center" justify="center">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </Button>
          <Text>Página {currentPage} de {totalPages}</Text>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};