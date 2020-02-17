import { ConfigChecker } from 'configchecker';
import { PDFOptions } from 'puppeteer';
const packageJson = require('../package.json');
export const version = packageJson.version;

const config = ConfigChecker.from(process.env);

export const PORT = config
    .get('PORT')
    .number()
    .default(3000).value!;

export const CACHE_DIR = config.get('CACHE_DIR').required().value;
export const SELF_URL = config
    .get('SELF_URL')
    .url()
    .required()
    .value.toString()
    .replace(/\/+$/g, '');

// TODO: Choise between local and AWS S3 cache
export const AWS_S3_BUCKET_NAME = config.get('AWS_S3_BUCKET_NAME').default('untitled').value!;
export const AWS_ACCESS_KEY_ID = config.get('AWS_ACCESS_KEY_ID').value;
export const AWS_SECRET_ACCESS_KEY = config.get('AWS_SECRET_ACCESS_KEY').value;
export const AWS_REGION = config.get('AWS_REGION').value;

export const ALLOWED_DOMAINS = config
    .get('ALLOWED_DOMAINS')
    .list()
    .default([]).value!;
ALLOWED_DOMAINS.push(`en.wikipedia.org`); // For testing purpose

export const PUPPETEER_LAUNCH_OPTIONS = config
    .get('PUPPETEER_LAUNCH_OPTIONS')
    .json()
    .default({}).value;

export const PUPPETEER_PDF_OPTIONS = config
    .get('PUPPETEER_PDF_OPTIONS')
    .json()
    .asType<Partial<PDFOptions>>()
    .default({ format: 'A4', printBackground: true, margin: { left: '1cm', top: '1cm', right: '1cm', bottom: '1cm' } })
    .value;
