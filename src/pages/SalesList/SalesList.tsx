import {
    Box,
    Button,
    Collapse,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SaleAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';
import SaleDetailTable from './SaleDetailTable';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import { formatFullDate, formatHour } from '../../utils/date';
import Pagination from '../../components/Pagination/Pagination';
import { Sale } from '../../services/sale/dtos/generic';

const SalesList = () => {
    const { getSales, updateStatusSale } = SaleAction();
    const sales = useSaleStore(state => state.list.sales);
    const status = useSaleStore(state => state.status)

    const totalSales = useSaleStore(state => state.list.total);
    const salesPerPage = 10; // Número de ventas por página dentro de cada semana
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedSaleId, setExpandedSaleId] = useState(null);
    const [selectedSale, setSelectedSale] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedNewStatus, setSelectedNewStatus] = useState(null);
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
    const { pathname,  } = useLocation();

    useEffect(() => {
        getSales({
            page: currentPage,
            limit: salesPerPage
        });
    }, [currentPage]);

    useEffect(() => {
        pathname === ROUTES.SALES_LIST &&
        getSales({page:1})
    }, [pathname])


    const totalPages = Math.ceil(totalSales / salesPerPage);

    const handleStatusChangeClick = (sale) => {
        setSelectedSale(sale);
        onOpen();
    };

    const handleRejectClick = (sale) => {
        setSelectedSale(sale);
        onConfirmOpen();
    };


    const confirmRejectSale = () => {
        updateStatusSale(selectedSale.id, {
            status: 'rejected',
        })
        onConfirmClose();
    };

    const toggleExpand = (saleId) => {
        setExpandedSaleId(expandedSaleId === saleId ? null : saleId);
    };

    const statusLabel = (status: 'pending' | 'approved' | 'rejected') => {
        switch (status) {
            case 'pending':
                return 'Pendiente'; 
            case 'approved':
                return 'Aprobada';
            case 'rejected':
                return 'Rechazada';        
            default:
                break;
        }
    }
    
    return (
        <Box className="pt-4 px-4  sm:pt-8 pb-0 px-8 bg-gray-100 min-h-screen" position={'relative'} height="100vh" overflowY="auto">
            <Text fontSize="2xl" fontWeight="bold" className="text-center mb-6">Ventas</Text>
            {status.isFetching && <LoadingOverlay/>}
            {sales.length > 0 && sales.map((sale: Sale) => (
                <Box
                    key={sale.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm bg-white cursor-pointer"
                    onClick={() => toggleExpand(sale.id)}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="4">
                        <Box flex="2">
                            <Text fontSize="md" fontWeight="semibold">{capitalizeFirstLetter(sale.user?.name)} {capitalizeFirstLetter(sale.user?.lastname)}</Text>

                            <Text display={{ base: "none", sm: "block" }} fontSize="sm" color="gray.500">Usuario: {capitalizeFirstLetter(sale.user?.lastname) + ' ' + capitalizeFirstLetter(sale.user?.name) || 'N/A'}</Text>
                            <Text display={{ base: "block", sm: "none" }} fontSize="sm" color="gray.500">{sale.user?.lastname + ' ' + sale.user?.name || 'N/A'}</Text>

                            <Text display={{ base: "none", sm: "block" }} fontSize="sm" color="gray.500">Fecha de creación: {formatFullDate(sale.date)} a las {formatHour(sale.date)}</Text>
                            <Text display={{ base: "block", sm: "none" }} fontSize="sm" color="gray.500">{sale.creationDate}</Text>

                            <Text fontSize="sm" color={sale.status === 'pending' ? 'orange.500' : sale.status === 'approved' ? 'green.500' : 'red.500'}>
                                Estado: {statusLabel(sale.status)}
                            </Text>
                        </Box>
                        <Box textAlign="right" flex="1">
                            <Text fontSize={{ base: "xs", md: "md" }} fontWeight="bold">Total: {formattedNumberToMoney(sale.details.reduce((acc, detail) => acc + (detail.prices.retail + detail.prices.wholesale) * detail.quantity, 0))}</Text>
                            {sale.status === 'pending' && (
                                <>
                                    <Box display={{ base: "none", md: "flex" }} justifyContent="flex-end" gap="2" mt="2">
                                        <Button size="sm" colorScheme="green" onClick={(e) => { e.stopPropagation(); updateStatusSale(sale.id, { status: 'approved' }) }}>
                                            Aprobar
                                        </Button>
                                        <Button size="sm" colorScheme="red" onClick={(e) => { e.stopPropagation(); handleRejectClick(sale); }}>
                                            Rechazar
                                        </Button>
                                    </Box>
                                    <Box display={{ base: "flex", md: "none" }} flexDirection={'column'} justifyContent="flex-end" gap="2" mt="2">
                                        <Button size="xs" colorScheme="green" onClick={(e) => { e.stopPropagation(); updateStatusSale(sale.id, { status: 'approved' }) }}>
                                            Aprobar
                                        </Button>
                                        <Button size="xs" colorScheme="red" onClick={(e) => { e.stopPropagation(); handleRejectClick(sale); }}>
                                            Rechazar
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>

                    <Collapse in={expandedSaleId === sale.id} animateOpacity>
                        <Box mt="4" p="4" bg="gray.50" rounded="md" shadow="inner">
                            <Text fontWeight="bold" mb="2">Detalles de los Productos:</Text>
                            <SaleDetailTable details={sale.details} />
                        </Box>
                    </Collapse>
                </Box>
            ))}

           <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => setCurrentPage(page)}
           />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cambiar Estado de Venta</ModalHeader>
                    <ModalBody>
                        <Text>Selecciona el nuevo estado para la venta {selectedSale?.code}:</Text>
                        <Select mt="4" onChange={(e) => setSelectedNewStatus(e.target.value)} defaultValue={selectedSale?.status}>
                            <option value="pending">Pendiente</option>
                            <option value="approved">Aprobada</option>
                            <option value="rejected">Rechazada</option>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button size={{ base: "xs", md: "sm" }} variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button size={{ base: "xs", md: "sm" }} colorScheme="blue" ml={3} onClick={() => { updateStatusSale(selectedSale.id, { status: selectedNewStatus }); onClose() }}>
                            Guardar Cambios
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Modal de Confirmación para Rechazo */}
            <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmación de Rechazo</ModalHeader>
                    <ModalBody>
                        <Text>¿Está seguro que desea rechazar la venta {selectedSale?.code}?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button size={{ base: "xs", md: "sm" }} variant="ghost" onClick={onConfirmClose}>Cancelar</Button>
                        <Button size={{ base: "xs", md: "sm" }} colorScheme="red" ml={3} onClick={confirmRejectSale}>
                            Confirmar Rechazo
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

// Función auxiliar para calcular el rango de fechas de una semana
const calculateWeekRange = (code) => {
    if (code === undefined) {
        return 'hola';
    }
    const [year, weekNumber] = code.split('-').map(Number);

    // Crear el primer día del año
    const firstDayOfYear = new Date(year, 0, 1);

    // Calcular el primer lunes del año (o el mismo día si el año comienza en lunes)
    const firstMonday = new Date(firstDayOfYear);
    const dayOfWeek = firstMonday.getDay();
    const dayOffset = (dayOfWeek === 0) ? 1 : (8 - dayOfWeek); // Ajuste para comenzar en lunes
    firstMonday.setDate(firstMonday.getDate() + dayOffset - 1);

    // Calcular el primer día de la semana solicitada
    const weekStart = new Date(firstMonday);
    weekStart.setDate(firstMonday.getDate() + (weekNumber - 1) * 7);

    // Calcular el último día de la semana (6 días después del inicio)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const formatDate = (date) => date.toISOString().split('T')[0];

    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

};

export default SalesList;
