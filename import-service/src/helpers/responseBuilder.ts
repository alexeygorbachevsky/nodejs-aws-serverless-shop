import {logger} from "./logger";
import {DEFAULT_HEADERS} from "../constants/headers";

interface ResponseInterface {
    statusCode: number
    headers: Object,
    body: Object
}

const errorResponse = (err: Error, statusCode: number = 500): ResponseInterface => {
    const errorMessage = err?.message || 'Error is occurred';
    logger.logError(`Error: ${errorMessage}`);

    return {
        statusCode,
        headers: {
            ...DEFAULT_HEADERS
        },
        body: JSON.stringify({message: errorMessage})
    }
}

const successResponse = (body: Object, statusCode: number = 200): ResponseInterface => {
    logger.logRequest(`Lambda successfully invoked with following body: ${JSON.stringify(body)}`);

    return {
        statusCode,
        headers: {
            ...DEFAULT_HEADERS
        },
        body: JSON.stringify(body)
    }
}

export {errorResponse, successResponse, ResponseInterface};
