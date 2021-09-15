import {ProductServiceInterface} from "../types/products";
import {logger} from "../helpers/logger";
import {errorResponse, successResponse} from "../helpers/responseBuilder";

export const createProductHandler = (productService: ProductServiceInterface) => async (event: any) => {
    try {
        logger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

        const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

        const product = await productService.createProduct(body);

        logger.logRequest(`Result is: ${JSON.stringify(product)}`);

        if (product) {
            return successResponse({product}, 201);
        }

        const error=new Error("Product was not created")
        return errorResponse(error);


    } catch (err) {
        return errorResponse(err);
    }
}
