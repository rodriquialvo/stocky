import React from 'react';
import { Box, SimpleGrid, Spinner, useDisclosure } from '@chakra-ui/react';
import NavigationBar from '../../components/TabNav/NavigationBar';
import GalleryItem from '../../components/GalleryItem/GaleryItem';
import Hero from '../../components/Hero/Hero';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { useGaleryController } from './Galery.controller';
import { GaleryProps } from './interfaces';

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
  }
];

const GalleryPage: React.FC<GaleryProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useController = useGaleryController } = props;
  const controller = useController();
  
  return (
    <Box
    >
      {/* <Spinner/> */}
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
        flex={1}
      >
        {controller.productsViewModel.map((item, index) => (
          <GalleryItem key={index} {...item} />
        ))}
      </SimpleGrid>

    </Box>
  );
};

export default GalleryPage;