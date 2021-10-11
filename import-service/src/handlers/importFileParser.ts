import csv from 'csv-parser';

const {IMPORT_BUCKET} = process.env;

export const importFileParser = ({
                                     s3,
                                     logger,
                                     sqs
                                 }: any) => async (event: { Records: any[]; }) => {
    logger.logRequest(`Incoming event - ${JSON.stringify(event)}`);

    const sendToQueue = async (data: any) => {
        try {
            await sqs.sendMessage({
                QueueUrl: process.env.SQS_URL,
                MessageBody: JSON.stringify(data),
            }).promise();
            logger.logRequest(`Message was sent to SQS: ${JSON.stringify(data)}`);
        } catch (error) {
            logger.logRequest(`Error for send to SQS: ${JSON.stringify(error)}`);
        }
    }

    for (const record of event.Records) {
        await new Promise((resolve, reject) => {
            const s3Stream = s3.getObject({
                Bucket: IMPORT_BUCKET,
                Key: record.s3.object.key
            }).createReadStream();

            s3Stream.pipe(csv())
                .on('data', async (data: any) => {
                    logger.logRequest(`Data - ${JSON.stringify(data)}`);
                    await sendToQueue(data);
                })
                .on('end', async () => {
                    logger.logRequest(`Copy from ${IMPORT_BUCKET}/${record.s3.object.key}`);

                    await s3.copyObject({
                        Bucket: IMPORT_BUCKET,
                        CopySource: `${IMPORT_BUCKET}/${record.s3.object.key}`,
                        Key: record.s3.object.key.replace('uploaded', 'parsed')
                    }).promise();

                    logger.logRequest(`Copied into ${IMPORT_BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);

                    await s3.deleteObject({
                        Bucket: IMPORT_BUCKET,
                        Key: record.s3.object.key,
                    }).promise();

                    logger.logRequest(`Deleted from ${IMPORT_BUCKET}/uploaded`);
                    resolve();
                })
                .on('error', (err: Error) => {
                    logger.logError(JSON.stringify(err));
                    reject();
                })
        });
    }
}
