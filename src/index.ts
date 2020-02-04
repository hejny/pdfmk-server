import { htmlToPdfRouteHandler } from './htmlToPdfRouteHandler';
import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';
import { PORT } from './config';

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
