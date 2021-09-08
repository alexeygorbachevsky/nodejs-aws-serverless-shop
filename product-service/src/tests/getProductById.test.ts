import {ProductService} from "./inMemoryProductService";
import {getProductById} from "./testHandlers";

describe('getProductById lambda handler', () => {

    test('should return data', async () => {
        const productService = new ProductService();
        const expectedProduct = await productService.getProductById("7567ec4b-b10c-48c5-9345-fc73c48a80a0");

        const data = await getProductById({
            pathParameters: {productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a0"}
        });

        const {body, statusCode} = data;
        const {product} = JSON.parse(body as string);

        expect(product).toEqual(expectedProduct);
        expect(statusCode).toEqual(200);
    });
});
