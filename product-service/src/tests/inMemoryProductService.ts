import {ProductInterface} from '../types/products';
import products from './productList.json';

export interface ProductServiceInterface {
    getProductList: () => Promise<ProductInterface[]>,
    getProductById: (id: string) => Promise<ProductInterface>,
}

class ProductService implements ProductServiceInterface {

    async getProductList() {
        return <ProductInterface[]>products;
    }

    async getProductById(id: string) {
        return <ProductInterface>products.find((product: ProductInterface) => product.id === id);
    }
}


export {ProductService};
