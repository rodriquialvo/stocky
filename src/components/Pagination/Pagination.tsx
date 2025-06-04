import React from 'react';
import { Button, ButtonGroup, Flex, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const buttonColorScheme = useColorModeValue('pink', 'pink');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <Flex justify="center" align="center" gap={2}>
      <IconButton
        aria-label="Previous page"
        icon={<ChevronLeftIcon />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        colorScheme={buttonColorScheme}
        variant="outline"
        size="md"
      />

      <ButtonGroup spacing={2} variant="outline">
        {getPageNumbers().map((pageNumber, index) => (
          pageNumber === '...' ? (
            <Text key={`dots-${index}`} color={textColor} px={2}>
              {pageNumber}
            </Text>
          ) : (
            <Button
              key={`page-${pageNumber}`}
              onClick={() => onPageChange(Number(pageNumber))}
              colorScheme={buttonColorScheme}
              variant={currentPage === pageNumber ? 'solid' : 'outline'}
              size="md"
            >
              {pageNumber}
            </Button>
          )
        ))}
      </ButtonGroup>

      <IconButton
        aria-label="Next page"
        icon={<ChevronRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        colorScheme={buttonColorScheme}
        variant="outline"
        size="md"
      />
    </Flex>
  );
};

export default Pagination;
