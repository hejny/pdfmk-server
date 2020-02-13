import { RequestHandler } from 'express';

export const testRouteHandler: RequestHandler = async (request, response, next) => {
    const selfUrl = request.protocol + '://' + request.get('host'); //+ request.originalUrl;
    response.send(`
        <ul>
            <li><a href="${selfUrl}/html/pdf?url=${selfUrl}/test" target="_blank">Print me & show!</a></li>
            <li><a href="${selfUrl}/html/pdf?url=${selfUrl}/test&amp;download=1">Print me & download!</a></li>
        </ul>
    `);
};
