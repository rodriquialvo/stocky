import { ROUTES } from "./Routes";

export const SIDEBAR_ITEMS = {
    Stock: {
        label: 'Stock',
        subItems: [
            { label: 'Carrito', route: ROUTES.SHOPPING_CART },
            { label: 'Lista', route: ROUTES.STOCK_LIST },
            { label: 'Nuevo producto', route: ROUTES.NEW_PRODUCT },
            { label: 'Ingresar Stock', route: ROUTES.ADD_STOCK },
            { label: 'Galeria', route: ROUTES.GALLERY },
            { label: 'Ingreso', route: ROUTES.STOCK_ENTRY }
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
        ]
    }
}