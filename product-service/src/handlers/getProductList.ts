import {ProductServiceInterface} from "../types/products";
import {logger} from "../helpers/logger";
import {errorResponse, successResponse} from "../helpers/responseBuilder";

export const getProductListHandler = (productService: ProductServiceInterface) => async (event: any) => {
    try {
        logger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

        const products = await productService.getProductList();

        logger.logRequest(`"Received products: ${JSON.stringify(products)}`);

        return successResponse(products);
    } catch (err) {
        return errorResponse(err);
    }
}
