import { PDFOptions, ScreenshotOptions } from 'puppeteer';
import { IMakeConfigPdf, IMakeConfigImages } from './IMakeConfig';

export function cleanupConfigForPdf(config: IMakeConfigPdf): PDFOptions {
    const {
        path,
        scale,
        displayHeaderFooter,
        headerTemplate,
        footerTemplate,
        printBackground,
        landscape,
        pageRanges,
        format,
        width,
        height,
        margin,
        preferCSSPageSize,
    } = config;
    return {
        path,
        scale,
        displayHeaderFooter,
        headerTemplate,
        footerTemplate,
        printBackground,
        landscape,
        pageRanges,
        format,
        width,
        height,
        margin,
        preferCSSPageSize,
    };
}

export function cleanupConfigForImages(config: IMakeConfigImages): ScreenshotOptions {
    const { path, type, quality, fullPage, clip, omitBackground, encoding } = config;
    return {
        path,
        type,
        quality,
        fullPage,
        clip,
        omitBackground,
        encoding,
    };
}
