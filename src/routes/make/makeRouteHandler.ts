import { ConfigChecker } from 'configchecker';
import { RequestHandler } from 'express';
import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';
import { PUPPETEER_LAUNCH_OPTIONS } from '../../config';
import { cleanupConfigForImages, cleanupConfigForPdf } from './cleanupConfig';
import { extensionToContentType } from './extensionToContentType';
import { IMakeConfigImages, IMakeConfigPdf } from './IMakeConfig';
import { makeDocument } from './makeDocument';
import { makeRouteMakeConfig } from './makeRouteMakeConfig';

let browserPromise: Promise<Browser> | null = null;

function getBrowser(): Promise<Browser> {
    if (!browserPromise) {
        const defaultArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];
        const launchOptions: any = {
            headless: true,
            ...PUPPETEER_LAUNCH_OPTIONS,
        };
        launchOptions.args = Array.from(new Set([...(launchOptions.args || []), ...defaultArgs]));

        browserPromise = puppeteer.launch(launchOptions).catch((error) => {
            browserPromise = null;
            throw error;
        });
    }
    return browserPromise;
}

export const makeRouteHandler: RequestHandler = async (request, response, next) => {
    const queryRaw = (request.query || {}) as Record<string, string>;
    for (const key in queryRaw) {
        if (queryRaw[key] === '') {
            // TODO: This functionality should be in ConfigChecker - cast emptu strings as undefined
            delete queryRaw[key];
        }
    }
    const query = ConfigChecker.from(
        /* TODO: ConfigChecker.fromQuery */
        queryRaw,
    );
    const errorMessage = query.get('errorMessage').default(`Problem occured when creating a document.`).value!;

    let browserContext: BrowserContext | null = null;
    let page: Page | null = null;

    try {
        const config = makeRouteMakeConfig(query);

        // TODO: Maybe incognito context should be ready
        const browser = await getBrowser();
        const context = config.incognito
            ? await browser.createBrowserContext() // TODO: What about parallel incognito requests
            : browser.defaultBrowserContext();
        browserContext = context;

        page = await makeDocument(config, context);

        const title = page.title;
        let document: Buffer;
        if (config.type === 'pdf') {
            const pdfData = await page.pdf(cleanupConfigForPdf(config as IMakeConfigPdf));
            document = Buffer.from(pdfData);
        } else {
            const screenshotData = await page.screenshot({
                ...cleanupConfigForImages(config as IMakeConfigImages),
                encoding: 'binary',
            });
            document = Buffer.from(screenshotData);
        }

        return response
            .contentType(extensionToContentType(config.type))
            .header(
                'Content-disposition',
                `${
                    config.download
                        ? `attachment; filename="${
                              title /*TODO: escape*/ /*TODO: Maybe allow custom naming download*/
                          }.${config.type}"`
                        : 'inline'
                }`,
            )
            .send(document);
    } catch (error: any) {
        //TODO: handle other type of errors
        if (errorMessage === 'DEBUG') {
            return response.status(400).send(error?.message || String(error));
        } else {
            console.error(error);
            return response.status(400).send(errorMessage);
        }
    } finally {
        if (page) await page.close();
        if (browserContext && browserPromise) {
            const browser = await browserPromise.catch(() => null);
            if (browser && browser.defaultBrowserContext() !== browserContext) {
                // TODO: What about parallel incognito requests
                await browserContext.close();
            }
        }
    }

    /*
    try {
        makeRouteMakeConfig(query);

        // TODO: Pass file name in query parameters
        const content = await getConvertedFile(url.toString(), pdfOptions, noCache, renderOnCallback, waitUntil);

        return response
            .contentType('application/pdf')
            .header('Content-disposition', `${download ? `attachment; filename="${download}.pdf"` : 'inline'}`)
            .send(content);

    */
};
