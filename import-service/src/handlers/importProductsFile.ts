const {IMPORT_BUCKET} = process.env;
import {errorResponse, successResponse} from "../helpers/responseBuilder";

export const importProductsFile = ({
                                       s3,
                                       logger
                                   }: any) => async (event: any) => {
    try {
        logger.logRequest(`Incoming event - ${JSON.stringify(event)}`);

        const catalogName = event.queryStringParameters.name;
        const catalogPath = `uploaded/${catalogName}`;

        const params = {
            Bucket: IMPORT_BUCKET,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv'
        };

        const url = await s3.getSignedUrlPromise('putObject', params)

        return successResponse(url);
    } catch (error) {
        errorResponse(error);
    }
}
