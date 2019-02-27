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

const app = express();

app.use(json());
app.use(cors());

app.get('/html/pdf', htmlToPdfRouteHandler);

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
