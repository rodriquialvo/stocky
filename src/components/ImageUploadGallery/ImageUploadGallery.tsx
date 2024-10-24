import React, { useEffect, useState } from 'react';
import { Box, Image, VStack, HStack, IconButton, Button, Text, Stack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { images } from '../../constants/images';
import { ImageAction } from '../../store/image/actions';

export interface ImageUploadGalleryProps {
  images?: ImageListType;
  setImages?: (images: ImageListType) => void;
  maxNumber?: number;
}
const ImageUploadGallery = ({
  maxNumber = 5,
  images,
  setImages
}: ImageUploadGalleryProps) => {
  const scrollRef = React.useRef(null);

  // Manejo de scroll
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <VStack spacing={4} align="center" w="100%">
      <ImageUploading
        multiple
        value={images}
        onChange={(imageList) => setImages(imageList)}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove, // Para eliminar una sola imagen
          isDragging,
          dragProps,
        }) => (
          <>
            <Box
              w="100%"
              p={4}
              border="2px dashed"
              borderColor={isDragging ? 'teal.500' : 'gray.200'}
              display="flex"
              justifyContent="center"
              gap={20}
              {...dragProps}
            >
              <Button
                colorScheme="teal"
                onClick={onImageUpload}
                mb={4}
              >
                {isDragging ? 'Suelta las imágenes aquí' : 'Subir imágenes'}
              </Button>

              {imageList.length > 0 && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={onImageRemoveAll}
                  mb={4}
                >
                  Eliminar todas
                </Button>
              )}

            </Box>

            {imageList.length > 0 ? (
              <Box w="100%" position="relative">
                {/* Botones de navegación */}
                <IconButton
                  icon={<ArrowBackIcon />}
                  position="absolute"
                  left="0"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={1}
                  onClick={() => scroll(-200)}
                  aria-label="Scroll left"
                />

                <IconButton
                  icon={<ArrowForwardIcon />}
                  position="absolute"
                  right="0"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={1}
                  onClick={() => scroll(200)}
                  aria-label="Scroll right"
                />

                {/* Contenedor scrolleable */}
                <HStack
                  overflowX="scroll"
                  spacing={4}
                  ref={scrollRef}
                  padding="10px"
                  width="100%"
                  sx={{
                    '::-webkit-scrollbar': { display: 'none' },
                    '-ms-overflow-style': 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  {imageList.map((image, index) => (
                    <Box
                      key={index}
                      position="relative"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                      flexShrink={0}
                      w="200px"
                      h="150px"
                      _hover={{ opacity: 0.8, }}
                    >
                      {/* Botón de eliminar para cada imagen */}
                      <IconButton
                        icon={<CloseIcon />}
                        size="sm"
                        colorScheme="red"
                        position="absolute"
                        top="5px"
                        right="5px"
                        onClick={() => onImageRemove(index)}
                        zIndex={2}
                        aria-label="Eliminar imagen"
                      />
                      <Image
                        src={image.data_url}
                        alt={`imagen-${index}`}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                  ))}
                </HStack>
              </Box>
            ) : (
              <Text color="gray.500">No has subido ninguna imagen aún</Text>
            )}
          </>
        )}
      </ImageUploading>
    </VStack>
  );
};

export default ImageUploadGallery;
