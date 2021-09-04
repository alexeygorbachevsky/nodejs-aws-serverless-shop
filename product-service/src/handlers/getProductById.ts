import {ProductServiceInterface} from "../types/products";
import {logger} from "../helpers/logger";
import {errorResponse, successResponse} from "../helpers/responseBuilder";

export const getProductByIdHandler = (productService: ProductServiceInterface) => async (event: any) => {
    try {
        logger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

        const {productId = ''} = event.pathParameters;
        const product = await productService.getProductById(productId);

        logger.logRequest(`"Received product with id: ${productId}: ${JSON.stringify(product)}`);

        if (product) {
            return successResponse({product});
        }

        return successResponse({message: "Product not found"}, 404);


    } catch (err) {
        return errorResponse(err);
    }
}
