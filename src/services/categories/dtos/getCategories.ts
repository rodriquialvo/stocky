export interface GetCategoriesResponse {
    categories: Category[];
}

export interface Category {
    id:       string;
    name:     string;
    children: Category[];
}
