import {basicAuthorizerHandler} from './src/handlers';
import { logger } from './src/helpers/logger';

export const basicAuthorizer = basicAuthorizerHandler({logger});
