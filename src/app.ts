import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { version } from './config';
import { htmlToPdfRouteHandler } from './routes/htmlToPdfRouteHandler';
import { testHttpStatusCodeRouteHandler } from './routes/testHttpStatusCodeRouteHandler';
import { testRouteHandler } from './routes/testRouteHandler';

export function createApp(): { app: express.Application; server: http.Server } {
    const app = express();

    app.use(json());
    app.use(cors());

    const server = http.createServer(app);

    app.use((err: any, req: any, res: any, next: any) => {
        console.error(err);
    });

    app.get('/about', async (request, response) => {
        response.send({
            version,
        });
    });

    app.get('/html/pdf', htmlToPdfRouteHandler);

    app.get(['/', '/test'], testRouteHandler);
    app.get('/test/httpStatusCode/:statusCode', testHttpStatusCodeRouteHandler);

    return {
        app,
        server,
    };
}
