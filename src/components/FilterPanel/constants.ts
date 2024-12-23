export const initialStateFilters: FiltersState = {
    minRetailPrice: "0",
    maxRetailPrice: "0",
    categories: [],
    color: [],
    size: [],
    sort: 'default',
    page: 1,
    limit: "30",
    minCostPrice: "0",
    maxCostPrices: "0",
    minQuantity: "0",
    maxQuantity: "0",
    minResellerPrice:"0",
    maxResellerPrice: "0",
    hasStock: false
}

export interface FiltersState {
    minRetailPrice: number | string;
    maxRetailPrice: number | string;
    categories: string[];
    color: string[];
    size: string[];
    sort: string;
    page: number | string;
    limit: number | string;
    minCostPrice: number | string;
    maxCostPrices: number | string;
    minQuantity: number | string;
    maxQuantity: number | string;
    minResellerPrice: number | string;
    maxResellerPrice: number | string;
    hasStock: boolean;
    q?: string
}