export interface ProductInterface {
    id: string,
    title: string,
    description: string,
    price: number,
    count: number,
}

export interface ProductServiceInterface {
    getProductList: () => Promise<ProductInterface[]>,
    getProductById: (id: string) => Promise<ProductInterface>,
    createProduct: (product: Omit<ProductInterface, "id">) => Promise<ProductInterface>,
}
