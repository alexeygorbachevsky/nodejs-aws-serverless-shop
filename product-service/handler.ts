import {SNS} from "aws-sdk";

import {createProductHandler, getProductByIdHandler, getProductListHandler, catalogBatchProcessHandler} from "./src/handlers";
import {ProductService} from "./src/services/productService";


const productService = new ProductService();
const sns = new SNS();

export const getProductList = getProductListHandler(productService);
export const getProductById = getProductByIdHandler(productService);
export const createProduct = createProductHandler(productService);
export const catalogBatchProcess = catalogBatchProcessHandler(productService, sns);
