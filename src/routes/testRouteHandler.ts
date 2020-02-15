import { RequestHandler } from 'express';
import { SELF_URL } from '../config';

// prettier-ignore
export const testRouteHandler: RequestHandler = async (request, response, next) => {
    response.send(`
        <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}" target="_blank">Print me & show!</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;download=1">Print me & download!</a></li>
        </ul>
    `);
};
