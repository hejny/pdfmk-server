import { s3 } from './storage';
import * as path from 'path';
import { RequestHandler } from 'express';
import { execute } from './tools/execute';
import { createHash } from 'crypto';
import { parse } from 'url';
import { readFileSync, unlinkSync } from 'fs';
import { CACHE_DIR, ERROR_WRONG_URL, AWS_S3_BUCKET_NAME } from './config';
const slimerJS = require('slimerjs');

const PDF_SLIMER_SCRIPT = path.join(__dirname, 'slimerPDF.js');

export const htmlToPdfRouteHandler: RequestHandler = async (
    { query: { url, download } },
    res,
    next,
) => {

    const sendPdf = (file: any)=>{
        res.contentType('application/pdf');
        res.header(
            'Content-disposition',
            `${download ? `attachment; filename="${download}.pdf"` : 'inline'}`,
        );
        res.send(file);
    }

    try {
        
        const pdfKey = parse(url).hostname + '/' +url.split('/').join('-');

        console.log(pdfKey);

        const hash = createHash('sha256')
            .update(url)
            .digest('hex');
        //todo cache should have multiple layers
        const pdfPath = path.join(__dirname, '..', CACHE_DIR!, `${hash}.pdf`);
        

        try{
        const { Body, ContentType } = await s3
            .getObject({
                Bucket: AWS_S3_BUCKET_NAME,
                Key: pdfKey,
            })
            .promise();
            sendPdf(Body);

        }catch(error){

            //todo is existsSync OK?

            try {
                await execute(slimerJS.path, [
                    '--headless',
                    '--disk-cache=true',
                    PDF_SLIMER_SCRIPT,
                    url,
                    pdfPath,
                ]);
            } catch (error) {
                res.status(404).send(ERROR_WRONG_URL);
            }

            const pdfFile = readFileSync(pdfPath);
            const uploadResult = await s3
            .upload({
                Bucket: AWS_S3_BUCKET_NAME,
                Key: pdfKey,
                ContentType: 'application/pdf',
                Body: pdfFile,
            })
            .promise();

            sendPdf(pdfFile);
            unlinkSync(pdfPath);
        }


        //todo download or view
    } catch (error) {
        next(error);
    }
};
