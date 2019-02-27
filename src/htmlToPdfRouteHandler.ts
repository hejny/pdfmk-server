import * as path from 'path';
import { RequestHandler } from 'express';
import { execute } from './tools/execute';
const slimerJS = require('slimerjs');

const PDF_SLIMER_SCRIPT = path.join(__dirname, 'slimerPDF.js');

export const htmlToPdfRouteHandler: RequestHandler = async (
    { query: { url } },
    res,
    next,
) => {
    try {
        await execute(
            slimerJS.path,
            '--headless',
            '--disk-cache=true',
            PDF_SLIMER_SCRIPT,
            url,
            './c.pdf',
        );

        const pdfPath = './c.pdf';
        res.contentType('pdf');
        res.sendFile(pdfPath);
    } catch (error) {
        next(error);
    }
};
