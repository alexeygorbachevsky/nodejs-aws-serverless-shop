import {ProductServiceInterface} from "../types/products";
import {logger} from "../helpers/logger";
import {errorResponse, successResponse} from "../helpers/responseBuilder";

export const createProductHandler = (productService: ProductServiceInterface) => async (event: any) => {
    try {
        logger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

        const product = await productService.createProduct(event.body);

        logger.logRequest(`Result is: ${JSON.stringify(product)}`);

        if (product) {
            return successResponse({product});
        }

        return successResponse({message: "Product not found"}, 404);


    } catch (err) {
        return errorResponse(err);
    }
}
