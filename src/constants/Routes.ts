export const  ROUTES = {
    LOGIN: '/login',
    HOME: '/',
    SHOPPING_CART: '/cart/',
    STOCK_LIST: '/stock/list',
    ADD_STOCK: '/stock/add',
    RESSELLERS_LIST: '/resellers/list',
    NEW_RESELLER: '/resellers/new',
    RESSELLERS_METRICS: 'resellers/metrics',
    NEW_PRODUCT: '/product/new',
    GALLERY: '/gallery',
    PRODUCT_DETAILS: (id: string) =>  `/product/${id}`
}