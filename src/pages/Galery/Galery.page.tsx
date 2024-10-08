import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import GalleryItem from '../../components/GalleryItem/GaleryItem';
import Hero from '../../components/Hero/Hero';

const galleryData = [
  {
    name: 'Lace Bra',
    price: '$25',
    availability: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1672026231932-2d354a8d1ea3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683121351249-a38b3ba40d68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/flagged/photo-1578985355557-d6c2342fed0c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    name: 'Silk Panties',
    price: '$15',
    availability: 'Out of Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Sports Bra',
    price: '$30',
    availability: 'In Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Cotton Briefs',
    price: '$10',
    availability: 'Limited Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Lace Bra',
    price: '$25',
    availability: 'In Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Silk Panties',
    price: '$15',
    availability: 'Out of Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Sports Bra',
    price: '$30',
    availability: 'In Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Cotton Briefs',
    price: '$10',
    availability: 'Limited Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Cotton Briefs',
    price: '$10',
    availability: 'Limited Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Cotton Briefs',
    price: '$10',
    availability: 'Limited Stock',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
];

const GalleryPage: React.FC = () => {
  return (
    <Box
      // p={4}          // Aseguramos que el contenedor ocupe el 100% de la pantalla
      // px={10}
      // gap={40}
    >
      <Hero
        images={galleryData[0].images}
      />
      <SimpleGrid
        background="gray.100"
        columns={{ base: 1, md: 4 }} // Número de columnas según el tamaño de pantalla
        spacing={10 }
        // p={4} // Añade un poco de padding
        justifyItems="center" // Centra los elementos dentro de cada celda
        py={10}
      >
        {galleryData.map((item, index) => (
          <GalleryItem key={index} {...item} />
        ))}
      </SimpleGrid>
    </Box>

  );
};

export default GalleryPage;