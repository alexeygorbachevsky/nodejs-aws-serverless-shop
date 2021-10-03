import {ProductInterface} from '../types/products';
import products from '../services/productList.json';

export interface ProductServiceInterface {
    getProductList: () => Promise<ProductInterface[]>,
    getProductById: (id: string) => Promise<ProductInterface>,
    createProduct: (product: Omit<ProductInterface, "id">) => Promise<ProductInterface>,
}

class ProductService implements ProductServiceInterface {

    async getProductList() {
        return <ProductInterface[]>products;
    }

    async getProductById(id: string) {
        return <ProductInterface>products.find((product: ProductInterface) => product.id === id);
    }

    async createProduct(product: Omit<ProductInterface, "id">) {
        return {...product, id: "8059d21d-b43b-44b1-bb12-4775893a615c"}
    }

}


export {ProductService};
