import { ROUTES } from "./Routes";

export const SIDEBAR_ITEMS = (isAdmin: boolean) => ({
    Stock: {
        label: 'Stock',
        subItems: [
            isAdmin && { label: 'Lista', route: ROUTES.STOCK_LIST },
            isAdmin && { label: 'Nuevo producto', route: ROUTES.NEW_PRODUCT },
            { label: 'Galeria', route: ROUTES.GALLERY },
            isAdmin && { label: 'Ingreso', route: ROUTES.STOCK_ENTRY }
        ]
    },
    Resellers: {
        label: 'Resellers',
        subItems: [
            { label: 'Lista', route: ROUTES.RESSELLERS_LIST },
            { label: 'Nuevo', route: ROUTES.NEW_RESELLER },
            // { label: 'Métricas', route: ROUTES.RESSELLERS_METRICS },
        ]
    },
    Sales: {
        label: 'Sales',
        subItems: [
            { label: 'Lista', route: ROUTES.SALES_LIST },
            { label: 'Semana', route: ROUTES.SALES_WEEK },
        ]
    }
})