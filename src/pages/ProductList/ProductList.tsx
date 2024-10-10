import { Box, Button, Stack, Text } from '@chakra-ui/react';

import { useProductController } from './Product.controller'

export const ProductList = (props) => {
  const { useController = useProductController } = props;
  const controller = useController();

  const { products: stocks, currentPage, handleNextPage, handlePrevPage, totalPages } = controller;
  console.log(stocks);


  // if (isSidebarExpanded && isMobile) {
  //   return null;
  // }


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
              <th className="px-4 py-2">Talle</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Cost Price</th>
              <th className="px-4 py-2">Reseller Price</th>
              <th className="px-4 py-2">Public Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks &&  stocks.map((stock) => (
              <tr key={stock.id} className="border-t">
                <td className="px-4 py-2">{stock.id}</td>
                <td className="px-4 py-2">{stock.product.name}</td>
                <td className="px-4 py-2">{stock.product.description}</td>
                <td className="px-4 py-2">{stock.product.attributes?.brand || '-'}</td>
                <td className="px-4 py-2">{stock.variant.size || '-'}</td>
                <td className="px-4 py-2">{stock.variant.color || '-'}</td>
                <td className="px-4 py-2">{stock.quantity}</td>
                <td className="px-4 py-2">{stock.product.categories || '-'}</td>
                <td className="px-4 py-2">{stock.costPrice}</td>
                <td className="px-4 py-2">{stock.product.prices.reseller}</td>
                <td className="px-4 py-2">{stock.product.prices.retail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formato en tarjetas para pantallas pequeñas */}
      <div className="block lg:hidden mb-20">
        {stocks && stocks.map((stock) => (
          <div
            key={stock.id}
            className="border border-gray-300 rounded-lg mb-4 p-4 shadow-sm bg-white"
          >
            <p><strong>ID:</strong> {stock.id}</p>
            <p><strong>Name:</strong> {stock.product.name}</p>
            <p><strong>Description:</strong> {stock.product.description}</p>
            <p><strong>Brand:</strong> {stock.product.attributes?.brand}</p>
            <p><strong>Quantity:</strong> {stock.quantity}</p>
            <p><strong>Category:</strong> {stock.product.categories}</p>
            <p><strong>Cost Price:</strong> {stock.costPrice}</p>
            <p><strong>Reseller Price:</strong> {stock.product.prices.reseller}</p>
            <p><strong>Public Price:</strong> {stock.product.prices.retail || '-'}</p>
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