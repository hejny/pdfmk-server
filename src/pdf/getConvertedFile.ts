import { createHash } from 'crypto';
import { parse } from 'url';
import path from 'path';
import { CACHE_DIR } from '../config';
import { cacheFileUpload } from './cacheFileUpload';
import { cacheFileDownload } from './cacheFileDownload';
import { generatePDF } from './generatePDF';

export async function getConvertedFile(url: string, nocache = false, renderOnCallback?: string): Promise<Buffer> {
    const pdfKey = parse(url).hostname + '/' + url.split('/').join('-');
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
