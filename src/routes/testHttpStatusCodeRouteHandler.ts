import { RequestHandler } from 'express';
import { SELF_URL } from '../config';

// prettier-ignore
export const testHttpStatusCodeRouteHandler: RequestHandler = async (request, response, next) => {
    const {statusCode: statusCode_} = request.params;
    const statusCode = parseInt(statusCode_);

    response.status(statusCode).send(`
        <h1>Testing HTTP status code ${statusCode}</h1>
    `);
};
