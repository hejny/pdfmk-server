import { BrowserContext, Page } from 'puppeteer';
import { IMakeConfig } from './IMakeConfig';

export async function makeDocument(config: IMakeConfig, browserContext: BrowserContext): Promise<Page> {
    try {
        const page = await browserContext.newPage();
        await page.setBypassCSP(true /* TODO: Maybe also to config */);

        // TODO: Maybe deviceScaleFactor

        if (config.type === 'png' || config.type === 'jpeg') {
            if (config.width && config.height) {
                await page.setViewport({ width: config.width, height: config.height });
            }
        }

        await page.goto(config.url.toString(), {
            waitUntil: config.waitUntil,
            timeout: 1000 * 60 * 2 /* Minutes */, // TODO: This should be configurable
        });

        if (config.renderOnCallback) {
            // TODO: This is a bit hack can it be done somehow better?
            await page.evaluate(`window.${config.renderOnCallback} = ()=>{

                const renderNow = document.createElement("SPAN");
                renderNow.classList.add('renderNow');
                document.body.appendChild(renderNow);

            }
            //window.${config.renderOnCallback}();
            `);
            await page.waitForSelector('.renderNow');
        }

        //const options = { /*path: filePath*/ /* TODO: Are ...PUPPETEER_PDF_OPTIONS needed? */ ...config };
        // console.log('pdfOptionsComposed', pdfOptionsComposed);

        return page;
        // TODO: !!! await browser.close();

        //return readFileSync(filePath);

        // TODO: Delete cache files
    } catch (error) {
        console.error(error);
        if (error.message.includes('waiting for selector ".renderNow" failed')) {
            throw new Error(
                `Probbably not called window.${config.renderOnCallback} inside the rendered page "${config.url}".`,
            );
        } else {
            throw error;
        }
    }
}
