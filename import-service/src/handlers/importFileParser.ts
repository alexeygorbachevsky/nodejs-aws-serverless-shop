import csv from 'csv-parser';

const {IMPORT_BUCKET} = process.env;

export const importFileParser = ({
                                     s3,
                                     logger,
                                 }: any) => async (event: any) => {
    event.Records.forEach((record: any) => {
        const s3Stream = s3.getObject({
            Bucket: IMPORT_BUCKET,
            Key: record.s3.object.key
        }).createReadStream();

        s3Stream.pipe(csv())
            .on('data', (data: any) => {
                logger.log(data);
            })
            .on('end', async () => {
                logger.log(`Copy from ${IMPORT_BUCKET}/${record.s3.object.key}`);

                await s3.copyObject({
                    Bucket: IMPORT_BUCKET,
                    CopySource: `${IMPORT_BUCKET}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                logger.log(`Copied into ${IMPORT_BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
            });
    });
}
