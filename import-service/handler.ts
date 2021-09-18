import AWS from 'aws-sdk';

import {importProductsFileHandler, importFileParserHandler} from './src/handlers';
import { logger } from './src/helpers/logger';

const s3 = new AWS.S3({ region: 'eu-west-1' });

export const importFileParser = importFileParserHandler({
    s3,
    logger,
});

export const importProductsFile = importProductsFileHandler({
    s3,
});
