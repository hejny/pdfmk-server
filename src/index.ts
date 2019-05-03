import { exec } from 'child_process';
import { htmlToPdfRouteHandler } from './htmlToPdfRouteHandler';
import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';
import { PORT } from './config';

if (typeof process.env.SLIMERJSLAUNCHER === 'undefined') {
    throw new Error(
        'SLIMERJSLAUNCHER environment variable must be set to a Firefox 59.0 executable',
    );
}

process.on('unhandledRejection', (err) => {
    console.error(err);
});

const app = express();

app.use(json());
app.use(cors());

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
});

app.get('/html/pdf', htmlToPdfRouteHandler);

app.get('/kill', () => {
    process.exit();
});

app.listen(PORT, () => {
    console.log(
        `█████████████████████████████████████████████████████████████████████`,
    );
    console.log(`API is running at http://localhost:${PORT}`);
});

function messageJSON(message: string) {
    return {
        message,
    };
}
