import {SNS} from 'aws-sdk';

import {ProductInterface, ProductServiceInterface} from "../types/products";
import {logger} from '../helpers/logger';


const sns = new SNS();

const sendNotification = async (product: ProductInterface) => {

    try {
        await sns.publish({
            Subject: 'New product created',
            Message: JSON.stringify(product),
            MessageAttributes: {
                title: {
                    DataType: 'String',
                    StringValue: product.title
                }
            },
            TopicArn: process.env.SNS_ARN
        }).promise();

        logger.logRequest(`SNS notification was sent for ${product.title}`);

    } catch (error) {
        logger.logError(`Failed to send SNS notification: ${error}`);
    }

}

export const catalogBatchProcessHandler =
    (productService: ProductServiceInterface) => async (event: { Records: any; body: any; }, _context: any) => {
        logger.logRequest(`Incoming event: ${JSON.stringify(event)}`);
        try {
            for (const record of event.Records) {
                logger.logRequest(`Start processing record: ${record.body}`);

                const body = typeof record.body === "string" ? JSON.parse(record.body) : record.body;

                const product = await productService.createProduct(body);

                logger.logRequest(`Created product: ${JSON.stringify(product)}`);

                if (product.id) {
                    await sendNotification(product)
                }
            }

            return {
                statusCode: 202,
            };
        } catch (err) {
            logger.logError(`Failed to process batch request: ${err}`);
        }
    };
