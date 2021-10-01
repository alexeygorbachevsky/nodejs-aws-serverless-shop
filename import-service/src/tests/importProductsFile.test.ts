import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';

import {importProductsFileHandler} from "../handlers";
import {logger} from "../helpers/logger";


describe('importProductsFile lambda handler', () => {

    test('should return mocked signed url', async () => {

        const expectedResult = "signedUrl";

        AWSMock.mock('S3', 'getSignedUrl', expectedResult);

        const s3 = new AWS.S3({region: 'eu-west-1'});

        const importProductsFile = importProductsFileHandler({
            s3,
            logger
        });
        const {body, statusCode}: any = await importProductsFile({queryStringParameters: {name: "products"}});

        expect(JSON.parse(body)).toEqual(expectedResult);
        expect(JSON.parse(statusCode)).toEqual(200);
    });
});
