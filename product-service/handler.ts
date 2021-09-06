import {getProductListHandler, getProductByIdHandler, createProductHandler} from "./src/handlers";
import {ProductService} from "./src/services/productService";

const productService = new ProductService();

export const getProductList = getProductListHandler(productService);
export const getProductById = getProductByIdHandler(productService);
export const createProduct = createProductHandler(productService);
