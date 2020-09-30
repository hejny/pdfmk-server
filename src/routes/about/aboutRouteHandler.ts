import { RequestHandler } from 'express';
import ReactDOMServer from 'react-dom/server';
import { AboutSamples } from './AboutSamples';

export const aboutRouteHandler: RequestHandler = async (request, response, next) => {
    response.send(ReactDOMServer.renderToString(AboutSamples()));
};
