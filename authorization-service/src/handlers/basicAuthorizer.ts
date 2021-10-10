import 'source-map-support/register';
import {APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult, Callback} from "aws-lambda";

import {generatePolicy} from "../helpers/generatePolicy";

export const basicAuthorizer = ({logger}: any) => async (event: APIGatewayAuthorizerEvent, _context: any, callback: Callback<APIGatewayAuthorizerResult>) => {
    logger.logRequest(`event - ${JSON.stringify(event)}`);

    if (event.type != 'TOKEN') {
        logger.logError(`Authorization error: Event type is not a "TOKEN", but: ${event.type}`);
        return callback(`Unauthorized. Authorization header is not provided.`);
    }

    try {
        const authorizationToken = event.authorizationToken;

        const encodedCredentials = authorizationToken.split(' ')[1];
        const buffer = Buffer.from(encodedCredentials, 'base64');
        const plainCredentials = buffer.toString('utf-8').split(':');
        const [username, password] = plainCredentials;

        logger.logRequest(`username: ${username} and password: ${password}`);

        const storedPassword = process.env[username];
        const effect = storedPassword && storedPassword === password ? 'Allow' : 'Deny';

        logger.logRequest(`Effect: ${effect}`);

        const policy = generatePolicy(encodedCredentials, event.methodArn, effect);

        callback(null, policy);
    } catch (e) {
        const error = `Unauthorized: ${e.message || "Error when checking user credentials"}`
        logger.logError(error);
        callback(error);
    }

}
