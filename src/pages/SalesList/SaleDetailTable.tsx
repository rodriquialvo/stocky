import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { formattedNumberToMoney } from "../../utils/functions";

function SaleDetailTable({ details }) {
    const totalPriceRetail = details.reduce((acc, curr) => acc + curr.prices.retail * curr.quantity, 0);
    const totalPriceWholesale = details.reduce((acc, curr) => {
        if (curr.isWholesalePackage) {
            return acc + curr.prices.wholesale * curr.quantity;
        }
        return acc + 0;
    }, 0);

    return (
        <Box overflowX={"auto"} width={"100%"}>
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Producto</Th>
                        <Th>Artículo</Th>
                        <Th>Color</Th>
                        <Th>Talle</Th>
                        <Th>Cantidad</Th>
                        <Th>P. Venta</Th>
                        <Th>P. Mayorista</Th>
                        <Th>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {details.map((detail, index) => {
                        // Si es un producto con variante normal
                        if (detail.variantId) {
                            return (
                                <Tr key={index}>
                                    <Td>{detail.variantData.productName}</Td>
                                    <Td>{detail.variantData.productCode}</Td>
                                    <Td>{detail.variantData.variantAttributes?.[0]?.label || ''}</Td>
                                    <Td>{detail.variantData.variantAttributes?.[1]?.label || ''}</Td>
                                    <Td>{detail.quantity}</Td>
                                    <Td>{formattedNumberToMoney(detail.prices.retail)}</Td>
                                    <Td>{formattedNumberToMoney(detail.prices.wholesale)}</Td>
                                    <Td>{formattedNumberToMoney((detail.prices.retail * detail.quantity))}</Td>
                                </Tr>
                            );
                        } 
                        // Si es un producto mayorista complejo (sin variantId)
                        else if (detail.wholesaleVariants && detail.wholesaleVariants.length > 0) {
                            const totalQuantity = detail.wholesaleVariants.reduce((sum, variant) => sum + variant.quantity, 0);
                            const totalPrice = detail.wholesaleVariants.reduce((sum, variant) => sum + (detail.prices.wholesale * variant.quantity), 0);
                            
                            return (
                                <>
                                    <Tr key={`${index}-header`} bg="purple.50" borderLeft="2px solid" borderRight="2px solid" borderTop="2px solid" borderColor="purple.300">
                                        <Td colSpan={8} fontWeight="bold">{detail.productName} (Paquete Mayorista)</Td>
                                    </Tr>
                                    {detail.wholesaleVariants.map((wholesaleVariant, variantIndex) => (
                                        <Tr key={`${index}-${variantIndex}`} borderLeft="2px solid" borderRight="2px solid" borderColor="purple.300">
                                            <Td>{wholesaleVariant.variant.productName}</Td>
                                            <Td>{wholesaleVariant.variant.productCode}</Td>
                                            <Td>{wholesaleVariant.variant.variantAttributes.find(attr => attr.name === 'color')?.label || ''}</Td>
                                            <Td>{wholesaleVariant.variant.variantAttributes.find(attr => attr.name === 'size')?.label || ''}</Td>
                                            <Td>{wholesaleVariant.quantity}</Td>
                                            <Td>{formattedNumberToMoney(detail.prices.retail)}</Td>
                                            <Td>{formattedNumberToMoney(detail.prices.wholesale)}</Td>
                                            <Td>{formattedNumberToMoney((detail.prices.retail * wholesaleVariant.quantity))}</Td>
                                        </Tr>
                                    ))}
                                    <Tr key={`${index}-footer`} bg="purple.50" borderLeft="2px solid" borderRight="2px solid" borderBottom="2px solid" borderColor="purple.300">
                                        <Td colSpan={5} fontWeight="bold">Total del paquete</Td>
                                        <Td>{formattedNumberToMoney(detail.prices.retail)}</Td>
                                        <Td>{formattedNumberToMoney(detail.prices.wholesale)}</Td>
                                        <Td>{formattedNumberToMoney(totalPrice)}</Td>
                                    </Tr>
                                </>
                            );
                        }
                        // Si no tiene variantes ni es mayorista complejo
                        else {
                            return (
                                <Tr key={index}>
                                    <Td>{detail.productName}</Td>
                                    <Td>{detail.productCode}</Td>
                                    <Td>-</Td>
                                    <Td>-</Td>
                                    <Td>{detail.quantity}</Td>
                                    <Td>{formattedNumberToMoney(detail.prices.retail)}</Td>
                                    <Td>{formattedNumberToMoney(detail.prices.wholesale)}</Td>
                                    <Td>{formattedNumberToMoney((detail.prices.retail * detail.quantity))}</Td>
                                </Tr>
                            );
                        }
                    })}
                    <Tr bg="blue.50" borderTop="2px solid" borderColor="blue.300">
                        <Th>Total</Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th>{details.reduce((acc, curr) => acc + curr.quantity, 0)}</Th>
                        <Th>{formattedNumberToMoney(totalPriceRetail)}</Th>
                        <Th bg="blue.100" fontWeight="bold">{formattedNumberToMoney(totalPriceWholesale)}</Th>
                        <Th bg="green.100" fontWeight="bold">{formattedNumberToMoney(totalPriceRetail + totalPriceWholesale)}</Th>
                    </Tr>
                </Tbody>
            </Table>
        </Box> 
    );
}

export default SaleDetailTable;
