import React from 'react';
import { Box, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import NavigationBar from '../../components/TabNav/NavigationBar';
import GalleryItem from '../../components/GalleryItem/GaleryItem';
import Hero from '../../components/Hero/Hero';
import FilterPanel from '../../components/FilterPanel/FilterPanel';

const galleryData = [
  {
    name: 'Body less taza soft tul y puntilla',
    price: '$18.400',
    availability: 'Disponible',
    images: [
      'https://images.unsplash.com/photo-1519644473771-e45d361c9bb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1526404746352-668ded9b50ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1506629371177-38dbb6e04a4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    name: 'Silk Panties',
    price: '$15',
    availability: 'No Disponible',
    images: [
      'https://tiendanap.vtexassets.com/arquivos/ids/167469-1200-1440?v=638635735571370000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/157375-1200-1440?v=637632560927470000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/167470-1200-1440?v=638635735651570000&width=1200&height=1440&aspect=true',
    ],
  },
  {
    name: 'Pack x2 less de algodón plus size',
    price: '$4.904',
    availability: 'Disponible',
    images: [
      'https://tiendanap.vtexassets.com/arquivos/ids/166940-1200-1440?v=638591721748230000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/166941-1200-1440?v=638591721831970000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/166942-1200-1440?v=638591722327330000&width=1200&height=1440&aspect=true',
    ],
  },
  {
    name: 'Cotton Briefs',
    price: '$10',
    availability: 'Limited Stock',
    images: [
      'https://tiendanap.vtexassets.com/arquivos/ids/162335-1200-1440?v=638260642050300000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/162336-1200-1440?v=638260642193700000&width=1200&height=1440&aspect=true',
    ],
  },
  {
    name: 'Lace Bra',
    price: '$25',
    availability: 'Disponible',
    images: [
      'https://tiendanap.vtexassets.com/arquivos/ids/166091-1200-1440?v=638488796511330000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/166088-1200-1440?v=638488792964900000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/166092-1200-1440?v=638488800217100000&width=1200&height=1440&aspect=true',
    ],
  },
  {
    name: 'Pijama Playita',
    price: '$18.344',
    availability: 'No Disponible',
    images: [
      'https://tiendanap.vtexassets.com/arquivos/ids/167019-1200-1440?v=638594072730230000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/167020-1200-1440?v=638594072839500000&width=1200&height=1440&aspect=true',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Sports Bra',
    price: '$30',
    availability: 'Disponible',
    images: [
      'https://d22fxaf9t8d39k.cloudfront.net/58e1cfabaeeb4f5e5b7854d2a58dfde17a484d598ec151d5c00c74b4be1942a1301764.jpg',
      'https://d22fxaf9t8d39k.cloudfront.net/272a0f3bf357a86a004b6dd7b1d44a0b63b53afe8017a502f221acd11e061972301764.png',
      'https://d22fxaf9t8d39k.cloudfront.net/ef9b9d8db9de6f38a68740a02fd75a4a3b8f8cc60b09c8cbf1d341d30c9dcd55301764.png',
    ],
  },
  {
    name: 'Corpiño maternal amamantar lody',
    price: '$ 9.528',
    availability: 'Stock limitado',
    images: [
      'https://tiendanap.vtexassets.com/arquivos/ids/157880-1200-1440?v=637723241324470000&width=1200&height=1440&aspect=true',
      'https://tiendanap.vtexassets.com/arquivos/ids/157881-1200-1440?v=637723241489830000&width=1200&height=1440&aspect=true',
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box

    >
      <Hero
        images={galleryData[0].images}
      />
      <NavigationBar
        onClickFilterButton={onOpen}
      />
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        background="gray.100"

      >
        <FilterPanel
          onApplyFilters={(filters) => console.log(filters)}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
      <SimpleGrid
        columns={{ base: 1, lg: 4 }} // Número de columnas según el tamaño de pantalla
        spacing={10}
        p={4} // Añade un poco de padding
        justifyItems="center" // Centra los elementos dentro de cada celda
        py={10}
        // background={"red"}
        flex={1}
      >
        {galleryData.map((item, index) => (
          <GalleryItem key={index} {...item} />
        ))}
      </SimpleGrid>

    </Box>
  );
};

export default GalleryPage;