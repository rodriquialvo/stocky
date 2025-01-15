import React, { useEffect } from 'react';
import { Box, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import NavigationBar from '../../components/TabNav/NavigationBar';
import GalleryItem from '../../components/GalleryItem/GaleryItem';
import Hero from '../../components/Hero/Hero';
import { useGaleryController } from './Galery.controller';
import { GaleryProps } from './interfaces';
import { useProductStore } from '../../store/product/slice';
import { ProductAction } from '../../store/product/actions';
import WhatsAppButton from '../../components/WhatsAppButtonFloat/WhatsAppButtonFloat';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import Pagination from '../../components/Pagination/Pagination';
import { images } from '../../constants/images';



const GalleryPage: React.FC<GaleryProps> = props => {
  const { getProducts } = ProductAction();
  const productFilters = useProductStore(state => state.productsFilters);
  const { useController = useGaleryController } = props;
  const controller = useController();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    getProducts(productFilters);
  }, [productFilters]);

  return (
    <Box
    >
      {
        isMobile ?
        <Hero
          images={[images.heroMobile]}
        />
        :
        <Hero
          images={[images.heroDesktop]}
        />

      }
      <WhatsAppButton />

      <NavigationBar
      />
      {
        controller.isLoading && (
          <LoadingOverlay />
        )
      }
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        background="gray.100"
      >

      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }} // Número de columnas según el tamaño de pantalla
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
      <Pagination
        currentPage={parseInt(productFilters.page.toString())}
        totalPages={Math.ceil(controller.totalProducts / parseInt(productFilters.limit.toString()))}
        onPageChange={controller.onChangeCurrentPage}
      />
    </Box>
  );
};

export default GalleryPage;