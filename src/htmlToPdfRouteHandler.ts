import * as path from 'path';
import { RequestHandler } from 'express';
import { execute } from './tools/execute';
import { createHash } from 'crypto';
import { statSync } from 'fs';
import { CACHE_DIR } from './config';
const slimerJS = require('slimerjs');

const PDF_SLIMER_SCRIPT = path.join(__dirname, 'slimerPDF.js');

export const htmlToPdfRouteHandler: RequestHandler = async (
    { query: { url, download } },
    res,
    next,
) => {
    try {
        const hash = createHash('sha256')
            .update(url)
            .digest('base64');
        //todo cache should have multiple layers
        const pdfPath = path.join(__dirname, '..', CACHE_DIR!, `${hash}.pdf`);

        if(!statSync(pdfPath).isFile()){//todo is statSync OK?
            await execute(
                slimerJS.path,
                '--headless',
                '--disk-cache=true',
                PDF_SLIMER_SCRIPT,
                url,
                pdfPath,
            );
        }

        res.contentType('pdf');
        res.header(
            'Content-disposition',
            `${download ? `attachment; filename="${download}.pdf"` : 'inline'}`,
        );

        //todo download or view
        res.sendFile(pdfPath);
    } catch (error) {
        next(error);
    }
};
