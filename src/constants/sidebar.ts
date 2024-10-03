import { ROUTES } from "./Routes";

export const SIDEBAR_ITEMS = {
    Stock: {
        label: 'Stock',
        subItems: [
            { label: 'Lista', route: ROUTES.STOCK_LIST },
            { label: 'Nuevo producto', route: ROUTES.NEW_PRODUCT },
        ]
    },
    Resellers: {
        label: 'Resellers',
        subItems: [
            { label: 'Lista', route: ROUTES.RESSELLERS_LIST },
            { label: 'Nuevo', route: ROUTES.NEW_RESELLER },
            { label: 'Métricas', route: ROUTES.RESSELLERS_METRICS },
        ]
    }
}