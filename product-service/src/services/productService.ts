import {ProductInterface, ProductServiceInterface} from '../types/products';
import invoke from "../db/invoke";

// import inMemoryProducts from './productList.json';

class ProductService implements ProductServiceInterface {

    async getProductList(): Promise<ProductInterface[]> {
        const query = "select * from product join stock on product.id=stock.product_id";
        const result = await invoke(query);
        return result?.rows as ProductInterface[];
    }

    async getProductById(id: string): Promise<ProductInterface> {
        const query = `select * from product join stock on product.id=stock.product_id where product.id='${id}'`;
        const result = await invoke(query);
        return result?.rows[0];
    }

    async createProduct(productService: Omit<ProductInterface, "id">) {
        const {title, price, description, count} = productService;

        const query = `
        WITH product as (
        insert into product (title, price, description) values
        (${title}, ${price}, ${description}) 
        returning id, title)
        insert into stock (product_id, count) values
        ((select product.id from product where product.title = ${title}), ${count}); 
    `;
        const result = await invoke(query);
        return result?.rows[0];
    }
}

export {ProductService};
