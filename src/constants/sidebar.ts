import { ROUTES } from "./Routes";

export const SIDEBAR_ITEMS = (isAdmin: boolean) => ({
    Stock: {
        label: 'Productos',
        subItems: [
            { label: 'Galeria', route: ROUTES.GALLERY },
            isAdmin && { label: 'Lista', route: ROUTES.STOCK_LIST },
            isAdmin && { label: 'Nuevo producto', route: ROUTES.NEW_PRODUCT },
            isAdmin && { label: 'Ingreso', route: ROUTES.STOCK_ENTRY }
        ]
    },
    Resellers: {
        label: 'Revendedores/as',
        subItems: [
            { label: 'Lista', route: ROUTES.RESSELLERS_LIST },
            { label: 'Nuevo', route: ROUTES.NEW_RESELLER },
        ]
    },
    Sales: {
        label: 'Ventas',
        subItems: [
            { label: 'Lista', route: ROUTES.SALES_LIST },
            { label: 'Resumen mensual', route: ROUTES.SALES_MONTHLY },
        ]
    }
})