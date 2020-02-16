import { createHash } from 'crypto';
import { parse } from 'url';
import path from 'path';
import { CACHE_DIR, ALLOWED_DOMAINS } from '../config';
import { cacheFileUpload } from './cacheFileUpload';
import { cacheFileDownload } from './cacheFileDownload';
import { generatePDF } from './generatePDF';

export async function getConvertedFile(url: string, nocache = false, renderOnCallback?: string): Promise<Buffer> {
    const parsedURL = parse(url);

    if (!parsedURL.hostname || (ALLOWED_DOMAINS && !ALLOWED_DOMAINS.includes(parsedURL.hostname))) {
        throw new Error(
            `URL "${url}" (domain "${parsedURL.hostname}") is not in whitelisted domain list ${(
                ALLOWED_DOMAINS || []
            ).join(', ')}.`,
        );
    }

    const pdfKey = parsedURL.hostname + '/' + url.split('/').join('-');
    const hash = createHash('sha256')
        .update(url)
        .digest('hex');

    const pdfCachePath = path.join(__dirname, '../..', CACHE_DIR, `${hash}.pdf`);

    let file = nocache ? null : await cacheFileDownload(pdfKey);

    if (!file) {
        file = await generatePDF(url, pdfCachePath, renderOnCallback);
        // Dont wait till file is fully cached
        cacheFileUpload(pdfKey, file, 'application/pdf');
    }

    return file;

    /*
    return (nocache ? Promise.reject() : cacheFileDownload(pdfKey))
        .catch(() => generatePDF(url, pdfCachePath, renderOnCallback))
        .then((file) => (nocache ? Promise.resolve(file) : cacheFileUpload(pdfKey, file, 'application/pdf')));

    */
}
