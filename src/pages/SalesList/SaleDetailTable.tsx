import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { formattedNumberToMoney } from "../../utils/functions";

function SaleDetailTable({ details }) {
    const totalPriceReseller = details.reduce((acc, curr) => acc + curr.prices.reseller * curr.quantity, 0);

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
                        <Th>P. Rev.</Th>
                        <Th>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {details.map((detail, index) => (
                        <Tr key={index}>
                            <Td>{detail.variantData.productName}</Td>
                            <Td>{detail.variantData.productCode}</Td>
                            <Td>{detail.variantData.variantAttributes?.[0]?.label || ''}</Td>
                            <Td>{detail.variantData.variantAttributes?.[1]?.label || ''}</Td>
                            <Td>{detail.quantity}</Td>
                            <Td>{formattedNumberToMoney(detail.prices.reseller)}</Td>
                            <Td>{formattedNumberToMoney((detail.prices.reseller * detail.quantity))}</Td>
                        </Tr>
                    ))}
                    <Tr>
                        <Th>Total</Th>
                        <Th></Th>
                        <Th></Th>
                        <Th>{details.reduce}</Th>
                        <Th>{details.reduce((acc, curr) => acc + curr.quantity, 0)}</Th>
                        <Th></Th>
                        <Th>{formattedNumberToMoney(totalPriceReseller)}</Th>
                    </Tr>
                </Tbody>
            </Table>
        </Box> 
    );
}

export default SaleDetailTable;
