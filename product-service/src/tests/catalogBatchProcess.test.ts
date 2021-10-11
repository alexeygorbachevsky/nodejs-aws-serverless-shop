import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';

import {catalogBatchProcessHandler} from "../handlers";
import {ProductService} from "./inMemoryProductService";
import {ProductServiceInterface} from "../types/products";


describe('catalogBatchProcess lambda handler', () => {


    test('should correctly publish sns', async () => {
        const mockedSNSPublish = jest.fn();

        const initialProduct = {
            title: "Test product",
            price: 200,
            count: 500,
            description: "Test description"
        }
        const expectedMessage = {...initialProduct, id: "8059d21d-b43b-44b1-bb12-4775893a615c"}
        const expectedParams = {
            Subject: 'Products were created',
            Message: JSON.stringify(expectedMessage),
            MessageAttributes: {
                title: {
                    DataType: 'String',
                    StringValue: initialProduct.title
                },
                price: {
                    DataType: 'Number',
                    StringValue: String(initialProduct.price),
                },

            },
            TopicArn: undefined
        }

        AWSMock.mock('SNS', 'publish', (params, cb: (arg0: null, arg1: string) => void) => {
            mockedSNSPublish(params);
            cb(null, 'success');
        });

        const sns = new AWS.SNS({region: 'eu-west-1'});

        const productService = new ProductService() as ProductServiceInterface;

        const catalogBatchProcess = catalogBatchProcessHandler(productService, sns);


        const {statusCode}: any = await catalogBatchProcess({
            Records: [{
                body: initialProduct
            }]
        }, null);

        expect(mockedSNSPublish).toHaveBeenCalled();
        expect(mockedSNSPublish).toHaveBeenCalledWith(expectedParams);
        expect(statusCode).toEqual(202);

    });
});
