import React from 'react';
import { Box, SimpleGrid, useMediaQuery, Container, Text } from '@chakra-ui/react';
import GalleryItem from '../../components/GalleryItem/GaleryItem';
import Hero from '../../components/Hero/Hero';
import { useGaleryController } from './Galery.controller';
import { GaleryProps } from './interfaces';
import { useProductStore } from '../../store/product/slice';
import WhatsAppButton from '../../components/WhatsAppButtonFloat/WhatsAppButtonFloat';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import Pagination from '../../components/Pagination/Pagination';
import { images } from '../../constants/images';

const GalleryPage: React.FC<GaleryProps> = props => {
  const productFilters = useProductStore(state => state.productsFilters);
  const { useController = useGaleryController } = props;
  const controller = useController();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box>
      {isMobile ? (
        <Hero images={[images.heroMobile]} />
      ) : (
        <Hero images={[images.heroDesktop]} />
      )}
      
      <WhatsAppButton />

      {controller.isLoading && <LoadingOverlay />}

      <Container maxW="8xl" py={8}>
        {controller.productsViewModel.length === 0 ? (
          <Box 
            textAlign="center" 
            py={20}
            px={4}
          >
            <Text fontSize="xl" color="gray.600">
              No se encontraron productos que coincidan con tu búsqueda
            </Text>
          </Box>
        ) : (
          <>
            <SimpleGrid
              columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
              spacing={{ base: 4, md: 6, lg: 8 }}
              justifyItems="center"
              py={6}
            >
              {controller.productsViewModel.map((item, index) => (
                <Box
                  key={index}
                  w="100%"
                  transition="transform 0.2s"
                  _hover={{ transform: 'translateY(-4px)' }}
                >
                  <GalleryItem {...item} />
                </Box>
              ))}
            </SimpleGrid>

            <Box py={8}>
              <Pagination
                currentPage={parseInt(productFilters.page.toString())}
                totalPages={Math.ceil(controller.totalProducts / parseInt(productFilters.limit.toString()))}
                onPageChange={controller.onChangeCurrentPage}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default GalleryPage;