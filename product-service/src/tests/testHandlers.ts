import {getProductByIdHandler, getProductListHandler} from "../handlers";
import {ProductService} from "./inMemoryProductService";
import {ProductServiceInterface} from "../types/products";

const productService = new ProductService() as ProductServiceInterface;

export const getProductList = getProductListHandler(productService);
export const getProductById = getProductByIdHandler(productService);
