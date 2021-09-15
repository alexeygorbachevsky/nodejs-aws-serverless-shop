import {ProductInterface, ProductServiceInterface} from '../types/products';
import invoke from "../db/invoke";

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

    async createProduct(product: Omit<ProductInterface, "id">) {
        const {title, price, description, count} = product;
        
        const query = `
        BEGIN;
        WITH insertedProduct AS (
        INSERT INTO product (title, price, description) VALUES ('${title}', ${price}, '${description}')  RETURNING *
        )
        INSERT INTO stock (product_id, count) VALUES ((select id from insertedProduct), ${count})  
        RETURNING 
        (select id from insertedProduct),
        (select title from insertedProduct),
        (select price from insertedProduct), 
        (select description from insertedProduct),
        count;  
        COMMIT;
        END;
        `

        const result = await invoke(query);

        return Array.isArray(result) ? result[1]?.rows[0] : null;
    }
}

export {ProductService};
