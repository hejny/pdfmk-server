import { LoadEvent, PDFOptions, ScreenshotOptions } from 'puppeteer';

export type IMakeConfig = IMakeConfigPdf | IMakeConfigPng | IMakeConfigJpeg;
export type IMakeConfigImages = IMakeConfigPng | IMakeConfigJpeg;

export interface IMakeConfigPdf extends IMakeConfigCommon, PDFOptions {
    type: 'pdf';
}

export interface IMakeConfigPng extends IMakeConfigCommon, ScreenshotOptions {
    type: 'png';
    // TODO: quality: number;
}

export interface IMakeConfigJpeg extends IMakeConfigCommon, ScreenshotOptions {
    type: 'jpeg';
    // TODO: quality: undefined;
}

export interface IMakeConfigCommon {
    url: URL;
    download: boolean;
    incognito: boolean;
    waitUntil: LoadEvent;
    renderOnCallback?: string;
}
