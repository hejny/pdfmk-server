import { ConfigChecker } from 'configchecker';
import { PDFOptions } from 'puppeteer';
const packageJson = require('../package.json');
export const version = packageJson.version;

if (process.env.NODE_ENV === 'development') {
    // Note: This is just for development:
    require('dotenv').config();
}

const config = ConfigChecker.from(process.env);

export const SELF_URL = config
    .get('SELF_URL')
    .url()
    .default(new URL('http://localhost:8080/'))
    .value.toString()
    .replace(/\/+$/g, '');

// TODO: !!! Use
export const ALLOWED_DOMAINS = config
    .get('ALLOWED_DOMAINS')
    .list()
    .default([]).value!;
ALLOWED_DOMAINS.push(`en.wikipedia.org`); // For testing purpose

export const PUPPETEER_LAUNCH_OPTIONS = config
    .get('PUPPETEER_LAUNCH_OPTIONS')
    .json()
    .default({}).value;

/**
 * @deprecated
 */
export const PUPPETEER_PDF_OPTIONS = config
    .get('PUPPETEER_PDF_OPTIONS')
    .json()
    .asType<Partial<PDFOptions>>()
    .default({ format: 'A4', printBackground: true, margin: { left: '1cm', top: '1cm', right: '1cm', bottom: '1cm' } })
    .value;

/*
Note: Google cloud functions does not need port
export const PORT = config
    .get('PORT')
    .number()
    .default(3000).value!;
*/
