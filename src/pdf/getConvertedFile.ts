import { createHash } from 'crypto';
import { parse } from 'url';
import path from 'path';
// TODO: !!! import { CACHE_DIR, ALLOWED_DOMAINS } from '../config';
//import { cacheFileUpload } from './cacheFileUpload';
//import { cacheFileDownload } from './cacheFileDownload';
import { generatePDF } from './generatePDF';
import { LoadEvent, PDFOptions } from 'puppeteer';

export async function getConvertedFile(
    url: string,
    pdfOptions: Partial<PDFOptions>,
    noCache = false,
    renderOnCallback?: string,
    waitUntil?: LoadEvent,
): Promise<Buffer> {
    const parsedURL = parse(url);

    /* TODO: !!!
    if (!parsedURL.hostname || !ALLOWED_DOMAINS.includes(parsedURL.hostname)) {
        throw new Error(
            `URL "${url}" (domain "${parsedURL.hostname}") is not in whitelisted domain list ${(
                ALLOWED_DOMAINS || []
            ).join(', ')}.`,
        );
    }
    */

    const pdfKey = parsedURL.hostname + '/' + url.split('/').join('-');
    // TODO: Other things as pdfOptions, renderOnCallback and waitUntil to cache hash
    // TODO: Use library sjcl
    // TODO: Hash cache: Encapsule to some function / library
    // TODO: Hash cache: Directory structure more deep
    const hash = createHash('sha256')
        .update(url)
        .digest('hex');

    //const pdfCachePath = path.join(__dirname, '../..', CACHE_DIR, `${hash}.pdf`);

    //let file = noCache ? null : await cacheFileDownload(pdfKey);

    /*
    if (!file) {
        file = await generatePDF(url, pdfOptions, pdfCachePath, renderOnCallback, waitUntil);
        // Dont wait till file is fully cached
        cacheFileUpload(pdfKey, file, 'application/pdf');
    }
    
    return file;
    */ 

   return generatePDF(url, pdfOptions, renderOnCallback, waitUntil);

    /*
    return (noCache ? Promise.reject() : cacheFileDownload(pdfKey))
        .catch(() => generatePDF(url, pdfCachePath, renderOnCallback))
        .then((file) => (noCache ? Promise.resolve(file) : cacheFileUpload(pdfKey, file, 'application/pdf')));

    */
}
