import { readFileSync } from 'fs';
import * as path from 'path';
import { getConvertedFile } from './getConvertedFile';

preconvert();

async function preconvert() {
    const preconvertText = readFileSync(
        path.join(__dirname, '../preconvert.txt'),
    ).toString();
    const urls = preconvertText
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url !== '');

    let i = 0;
    for (const url of urls) {
        i++;
        console.log(`[ ${i} / ${urls.length} ] Converting "${url}"`);
        try {
            await getConvertedFile(url);
        } catch (error) {
            console.log(`Error while converting "${url}".`);
        }
    }
}
