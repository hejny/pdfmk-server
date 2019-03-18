import { s3 } from './storage';
import * as path from 'path';
import { RequestHandler } from 'express';
import { execute } from './tools/execute';
import { createHash } from 'crypto';
import { parse } from 'url';
import { readFileSync, unlinkSync } from 'fs';
import { CACHE_DIR, ERROR_WRONG_URL, AWS_S3_BUCKET_NAME } from './config';
import { getConvertedFile } from './getConvertedFile';
const slimerJS = require('slimerjs');

export const htmlToPdfRouteHandler: RequestHandler = async (
    { query: { url, download, nocache } },
    res,
    next,
) => {
    try {
        const content = await getConvertedFile(url, nocache!!);
        res.contentType('application/pdf');
        //todo download or view
        res.header(
            'Content-disposition',
            `${download ? `attachment; filename="${download}.pdf"` : 'inline'}`,
        );
        res.send(content);
    } catch (error) {
        //todo handle other type of errors
        res.status(404).send(ERROR_WRONG_URL);
        //next(error);
    }
};
