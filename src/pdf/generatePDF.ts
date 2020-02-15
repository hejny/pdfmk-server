import { execute } from '../utils/execute';
import { readFileSync } from 'fs';
import path from 'path';
import { compatiblePath } from '../utils/compatiblePath';
// import { SLIMERJSLAUNCHER } from '../config';
const phantomJS = require('phantomjs');
const PDF_SCRIPT = compatiblePath(path.join(__dirname, 'generatePDF.phantom.js'));

export async function generatePDF(url: string, filePath: string, renderOnCallback?: string): Promise<Buffer> {
    try {
        //await execute(`export`, [`SLIMERJSLAUNCHER=${SLIMERJSLAUNCHER}`], true);
        const output = await execute(
            compatiblePath(phantomJS.path),
            [
                // '--headless',
                // '--disk-cache=true',
                PDF_SCRIPT,
                //renderOnCallback ? '--render-on-callback' : '',
                `"${url}"`,
                filePath,
                renderOnCallback ? renderOnCallback : ''
            ],
            true,
        );
        console.debug('PhantomJS', output);
        return readFileSync(filePath);

        // TODO: Delete cache files

    } catch (error) {
        console.error(error);
        throw new Error(`URL '${url}' not found`);
    }
}
