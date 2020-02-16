import { htmlToPdfRouteHandler } from './routes/htmlToPdfRouteHandler';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { json } from 'body-parser';
import { testRouteHandler } from './routes/testRouteHandler';
import { testHttpStatusCodeRouteHandler } from './routes/testHttpStatusCodeRouteHandler';
import { version } from './config';

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
