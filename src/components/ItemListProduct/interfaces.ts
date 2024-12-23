export interface ItemListProductProps {
    fullProduct: any,
    name: string,
    id: string,
    code: string,
    brand: string,
    hasStock: boolean,
    onClick: () => void,
    priceResseller: number,
    priceRetail: number,
    onPressCheckbox?: () => void,
    isChecked?: boolean
}
