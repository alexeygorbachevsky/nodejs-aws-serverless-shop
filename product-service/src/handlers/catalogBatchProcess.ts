import {ProductInterface, ProductServiceInterface} from "../types/products";
import {logger} from '../helpers/logger';


const sendNotification = async (product: ProductInterface, sns: any) => {

    try {
        await sns.publish({
            Subject: 'Products were created',
            Message: JSON.stringify(product),
            MessageAttributes: {
                title: {
                    DataType: 'String',
                    StringValue: product.title
                },
                price: {
                    DataType: 'Number',
                    StringValue: String(product.price),
                },

            },
            TopicArn: process.env.SNS_ARN
        }).promise();

        logger.logRequest(`SNS notification was sent for ${product.title}`);

    } catch (error) {
        logger.logError(`Failed to send SNS notification: ${JSON.stringify(error)}`);
    }

}

export const catalogBatchProcessHandler =
    (productService: ProductServiceInterface, sns: any) => async (event: { Records: any }, _context: any) => {
        logger.logRequest(`Incoming event: ${JSON.stringify(event)}`);
        try {
            for (const record of event.Records) {
                logger.logRequest(`Start processing record: ${record.body}`);

                const body = typeof record.body === "string" ? JSON.parse(record.body) : record.body;

                const product = await productService.createProduct(body);

                logger.logRequest(`Created product: ${JSON.stringify(product)}`);

                if (product.id) {
                    await sendNotification(product, sns);
                }
            }

            return {
                statusCode: 202,
            };
        } catch (err) {
            logger.logError(`Failed to process batch request: ${err}`);
        }
    };
