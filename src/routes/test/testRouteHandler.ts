import ReactDOMServer from 'react-dom/server';
import { RequestHandler } from 'express';
import { TestPage } from './TestPage';

export const testRouteHandler: RequestHandler = async (request, response, next) => {
    response.send(ReactDOMServer.renderToString(TestPage()));
};
