import { LoadEvent, PDFOptions, ScreenshotOptions } from 'puppeteer';

// TODO: Theese configs maybe to client

export type IMakeConfig = IMakeConfigPdf | IMakeConfigPng | IMakeConfigJpeg;
export type IMakeConfigImages = IMakeConfigPng | IMakeConfigJpeg;

export interface IMakeConfigPdf extends IMakeConfigCommon, PDFOptions {
    type: 'pdf';
}

export interface IMakeConfigPng extends IMakeConfigCommon, IMakeConfigImagesCommon, ScreenshotOptions {
    type: 'png';
    // TODO: quality: number;
}

export interface IMakeConfigJpeg extends IMakeConfigCommon, IMakeConfigImagesCommon, ScreenshotOptions {
    type: 'jpeg';
    // TODO: quality: undefined;
}

export interface IMakeConfigImagesCommon {
    width?: number;
    height?: number;
}

export interface IMakeConfigCommon {
    url: URL;
    download: boolean;
    incognito: boolean;
    waitUntil: LoadEvent;
    renderOnCallback?: string;
}
