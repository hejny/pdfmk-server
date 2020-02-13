import { execute } from '../utils/execute';
import { readFileSync } from 'fs';
import path from 'path';
const slimerJS = require('slimerjs');
const PDF_SLIMER_SCRIPT = path.join(__dirname, 'slimerPDF.js');

export async function generatePDF(url: string, filePath: string, renderOnCallback = false): Promise<Buffer> {
    try {
        const output = await execute(slimerJS.path, [
            '--headless',
            '--disk-cache=true',
            PDF_SLIMER_SCRIPT,
            renderOnCallback ? '--render-on-callback' : '',
            `"${url}"`,
            filePath,
        ]);
        console.debug('SlimerJS', output);
        return readFileSync(filePath);

        // TODO: Delete cache file
    } catch (error) {
        console.error(error);
        throw new Error(`URL '${url}' not found`);
    }
}
