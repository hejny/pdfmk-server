import { createApp } from './app';

const { app } = createApp();

exports.pdfmaker = app;

/*
Note: Google cloud functions runs this automatically

import { PORT } from "./config";

app.listen(PORT, () => {
    console.info('██████████████████████████████████████████');
    console.info(`API is running at http://localhost:${PORT}`);
    // TODO: displayRoutes(app);
});

/*
TODO: Is this worth it?
process.on('unhandledRejection', (err) => {
    console.error(err);
});
*/
