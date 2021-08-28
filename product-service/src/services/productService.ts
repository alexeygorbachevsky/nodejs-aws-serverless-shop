import {ProductInterface, ProductServiceInterface} from '../types/products';
import products from './productList.json';

class ProductService implements ProductServiceInterface {
    async getProductList() {
        return <ProductInterface[]>products;
    }

    async getProductById(id: string) {
        return <ProductInterface>products.find((product: ProductInterface) => product.id === id);
    }
}

export {ProductService};
