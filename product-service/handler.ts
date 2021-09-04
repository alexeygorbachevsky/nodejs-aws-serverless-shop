import {getProductListHandler} from "./src/handlers/getProductList";
import {getProductByIdHandler} from "./src/handlers/getProductById";
import {ProductService} from "./src/services/productService";

const productService = new ProductService();

export const getProductList = getProductListHandler(productService);
export const getProductById = getProductByIdHandler(productService);
