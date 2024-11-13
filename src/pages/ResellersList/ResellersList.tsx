import {
    Box,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UserAction } from '../../store/users/actions';
import { useUserStore } from '../../store/users/slice';
import { Routes, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';

const ResellerList: React.FC = () => {
    const { getResellers } = UserAction();
    const resellers = useUserStore(state => state.resellersList.resellers);
    const total = useUserStore(state => state.resellersList.total);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const {pathname} = useLocation()

    useEffect(() => {
        getResellers({
            page: currentPage,
            limit: itemsPerPage
        });
    }, []);

    useEffect(() => {
        pathname === ROUTES.RESSELLERS_LIST && 
        getResellers({page:1})
    },[pathname])

    const totalPages = Math.ceil(total / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentItems = resellers.slice(startIdx, endIdx);

    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh" bg="gray.50">
            <Box flex="1" overflowY="auto" p={4}>
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    Revendedores
                </Text>
                <Table variant="simple" colorScheme="gray" size="md" bg="white" shadow="md" borderRadius="md">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Lastname</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Active</Th>
                            <Th>Last Connection</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentItems.map((reseller, index) => (
                            <Tr key={index}>
                                <Td>{reseller.name}</Td>
                                <Td>{reseller.lastname}</Td>
                                <Td>{reseller.email}</Td>
                                <Td>{reseller.phone}</Td>
                                <Td>{reseller.active ? 'Yes' : 'No'}</Td>
                                <Td>{reseller.lastConnection}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            {/* Controles de Paginación */}
            <Flex justify="center" align="center" p={4} bg="white" shadow="md" position="sticky" bottom="0">
                <Button
                    onClick={() => goToPage(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    mr={2}
                    colorScheme="blue"
                    size="sm"
                >
                    &lt; Anterior
                </Button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <Button
                        key={page}
                        onClick={() => goToPage(page)}
                        colorScheme={currentPage === page ? 'blue' : 'gray'}
                        size="sm"
                        mx={1}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    onClick={() => goToPage(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    ml={2}
                    colorScheme="blue"
                    size="sm"
                >
                    Siguiente &gt;
                </Button>
            </Flex>
        </Box>
    );
};

// Simulación de datos de revendedoresla

export default ResellerList;
