import { s3 } from './storage';
import * as path from 'path';
import { execute } from './tools/execute';
import { createHash } from 'crypto';
import { parse } from 'url';
import { readFileSync, unlinkSync } from 'fs';
import { CACHE_DIR, AWS_S3_BUCKET_NAME } from './config';
const slimerJS = require('slimerjs');
const PDF_SLIMER_SCRIPT = path.join(__dirname, 'slimerPDF.js');

export async function getConvertedFile(url: string,nocache=false): Promise<any>{
    const pdfKey = parse(url).hostname + '/' +url.split('/').join('-');
    const hash = createHash('sha256')
        .update(url)
        .digest('hex');

    const pdfCachePath = path.join(__dirname, '..', CACHE_DIR!, `${hash}.pdf`);
    

    try{
        if(nocache){
            throw new Error(`No cache`);
        }
    const { Body, ContentType } = await s3
        .getObject({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: pdfKey,
        })
        .promise();
        return Body;

    }catch(error){

        //todo is existsSync OK?

        try {
            await execute(slimerJS.path, [
                '--headless',
                '--disk-cache=true',
                PDF_SLIMER_SCRIPT,
                url,
                pdfCachePath,
            ]);
        } catch (error) {
            throw new Error('Not found');
            //res.status(404).send(ERROR_WRONG_URL);
        }

        const pdfFile = readFileSync(pdfCachePath);
        await s3
        .upload({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: pdfKey,
            ContentType: 'application/pdf',
            Body: pdfFile,
        })
        .promise();
        unlinkSync(pdfCachePath);
        return pdfFile;
    }
}