import { ConfigChecker } from 'configchecker';
import { RequestHandler } from 'express';
import puppeteer, { BrowserContext, Page } from 'puppeteer';
import { parse as parseQuerystring } from 'querystring';
import { parse as parseUrl } from 'url';
import { PUPPETEER_LAUNCH_OPTIONS } from '../../config';
import { cleanupConfigForImages, cleanupConfigForPdf } from './cleanupConfig';
import { extensionToContentType } from './extensionToContentType';
import { IMakeConfigImages, IMakeConfigPdf } from './IMakeConfig';
import { makeDocument } from './makeDocument';
import { makeRouteMakeConfig } from './makeRouteMakeConfig';

const browserPromise = puppeteer.launch({ ...PUPPETEER_LAUNCH_OPTIONS });

export const makeRouteHandler: RequestHandler = async (request, response, next) => {
    const queryRaw = parseQuerystring(parseUrl(request.url).query || '') as Record<string, string>;
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
        browserContext = await (config.incognito
            ? (await browserPromise).createIncognitoBrowserContext() // TODO: What about parallel incognito requests
            : (await browserPromise).defaultBrowserContext());

        page = await makeDocument(config, browserContext);

        const title = page.title;
        let document: Buffer;
        if (config.type === 'pdf') {
            document = await page.pdf(cleanupConfigForPdf(config as IMakeConfigPdf));
        } else {
            document = await page.screenshot({
                ...cleanupConfigForImages(config as IMakeConfigImages),
                encoding: 'binary',
            }) as Buffer;
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
    } catch (error) {
        //TODO: handle other type of errors
        if (errorMessage === 'DEBUG') {
            return response.status(400).send(error.message);
        } else {
            console.error(error);
            return response.status(400).send(errorMessage);
        }
    } finally {
        if (page) page.close();
        if (browserContext && browserContext.isIncognito()) {
            // TODO: What about parallel incognito requests
            browserContext.close();
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
