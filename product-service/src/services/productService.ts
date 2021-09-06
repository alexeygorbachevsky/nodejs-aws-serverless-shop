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

        const tempResult = await invoke(`
        INSERT INTO product (title,price, description)
        VALUES ('${title}', ${price}, '${description}')  RETURNING *`);

        const createdProduct = tempResult?.rows[0]

        if (!createdProduct) {
            //    TODO
        }

        const result = await invoke(`
        INSERT INTO stock (product_id, count)
        VALUES ('${createdProduct.id}', ${count}) RETURNING *;
        `);
        const createdStock = result?.rows[0]

        if (!createdStock) {
            //    TODO
        }
        console.log("tempResult", tempResult);
        console.log("result", result);
        return {...createdProduct, count: createdStock.count};
    }
}

export {ProductService};
