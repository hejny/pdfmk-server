import puppeteer, { LoadEvent, PDFOptions } from 'puppeteer';
import { PUPPETEER_LAUNCH_OPTIONS, PUPPETEER_PDF_OPTIONS } from '../config';

export async function generatePDF(
    url: string,
    pdfOptions: Partial<PDFOptions>,
    //filePath: string,
    renderOnCallback?: string,
    waitUntil: LoadEvent = 'domcontentloaded',
): Promise<Buffer> {
    try {
        const browser = await puppeteer.launch({ ...PUPPETEER_LAUNCH_OPTIONS });
        const page = await browser.newPage();
        await page.setBypassCSP(true);

        //{waitUntil: ['networkidle2'/*,'domcontentloaded'*/]}
        await page.goto(url, {
            waitUntil, // @see https://pptr.dev/#?product=Puppeteer&show=api-pagegotourl-options
            timeout: 10000, // TODO: Configurable
        });

        if (renderOnCallback) {
            // TODO: This is a bit hack can it be done somehow better?
            await page.evaluate(`window.${renderOnCallback} = ()=>{
                
                const renderNow = document.createElement("SPAN");
                renderNow.classList.add('renderNow');
                renderNow.innerHtml = 'xxxxx';
                document.body.appendChild(renderNow);
                
            }
            //window.${renderOnCallback}();
            `);
            await page.waitForSelector('.renderNow');
        }

        const pdfOptionsComposed = { /*path: filePath*/ ...PUPPETEER_PDF_OPTIONS, ...pdfOptions };
        // console.log('pdfOptionsComposed', pdfOptionsComposed);

        return await page.pdf(pdfOptionsComposed);
        // TODO: !!! await browser.close();

        //return readFileSync(filePath);

        // TODO: Delete cache files
    } catch (error) {
        console.error(error);
        if (error.message.includes('waiting for selector ".renderNow" failed')) {
            throw new Error(`Probbably not called window.${renderOnCallback} inside the rendered page "${url}".`);
        } else {
            throw error;
        }
    }
}
