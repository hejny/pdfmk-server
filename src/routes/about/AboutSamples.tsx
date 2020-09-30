import React from 'react';
import { AboutInteractiveForm } from './AboutInteractiveForm';
import { PDFOptions } from 'puppeteer';
import { SELF_URL, version } from '../../config';
import { GitHubCorner } from './GitHubCorner';

export function AboutSamples() {
    return (
        <>
            <h1>PDF Maker</h1>

            {/* TODO: More info */}
            <p>Version: {version}</p>

            <h2>Interactive</h2>
            <AboutInteractiveForm />

            {/*
            TODO:
            <h2>Basics</h2>
            <ul>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        Print me & show!
                    </a>
                </li>
                <li>
                    <a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;noCache=YES&amp;download=page">
                        Print me & download as page.pdf!
                    </a>
                </li>
            </ul>

            <h2>Error handling</h2>
            <ul>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/200`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        OK (200){' '}
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/400`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        Bad Request (400){' '}
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/401`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        Unauthorized (401){' '}
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/403`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        Forbidden (403){' '}
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/404`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        Not Found (404){' '}
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/500`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        Internal Server Error (500)
                    </a>
                </li>
            </ul>

            <h2>Waiting</h2>
            <ul>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;noCache=YES&amp;renderOnCallback=renderMe"
                        target="_blank"
                    >
                        Print me but wait until countdown.
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;c=YES&amp;waitUntil=load"
                        target="_blank"
                    >
                        Random Wikipedia article, waitUntil=load.
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;noCache=YES&amp;waitUntil=domcontentloaded"
                        target="_blank"
                    >
                        Random Wikipedia article, waitUntil=domcontentloaded.
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;noCache=YES&amp;waitUntil=networkidle0"
                        target="_blank"
                    >
                        Random Wikipedia article, waitUntil=networkidle0.
                    </a>
                </li>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;noCache=YES&amp;waitUntil=networkidle2"
                        target="_blank"
                    >
                        Random Wikipedia article, waitUntil=networkidle2.
                    </a>
                </li>
            </ul>
            <p>
                See <a href="https://pptr.dev/#?product=Puppeteer&show=api-pagegotourl-options">Puppeteer manual</a> for
                waitUntil options.
            </p>
            <p>TODO: In future there will be option of waiting some time</p>

            <h2>Advanced content</h2>
            <ul>
                <li>
                    <a
                        href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test?words`)}&amp;noCache=YES"
                        target="_blank"
                    >
                        Print me with multiple pages of text.
                    </a>
                </li>
            </ul>

            <h2>PDF options</h2>
            <ul>
                $
                {([
                    {
                        name: 'Format A4',
                        pdfOptions: { format: 'A4' },
                    },
                    {
                        name: 'Format A5',
                        pdfOptions: { format: 'A5' },
                    },
                    {
                        name: 'Format 9cm x 5cm (VCard)',
                        pdfOptions: { format: null, width: '9cm', height: '5cm' },
                    },
                    {
                        name: 'Format A4, margin 1cm',
                        pdfOptions: { format: null, margin: { left: '1cm', top: '1cm', right: '1cm', bottom: '1cm' } },
                    },
                    {
                        name: 'Format A4, no margin',
                        pdfOptions: { margin: { left: 0, top: 0, right: 0, bottom: 0 } },
                    },
                    {
                        name: 'Format 10cm x 10cm, margin 2cm',
                        pdfOptions: {
                            format: null,
                            width: '10cm',
                            height: '10cm',
                            margin: { left: '2cm', top: '2cm', right: '2cm', bottom: '2cm' },
                        },
                    },
                ] as { name: string; pdfOptions: Partial<PDFOptions> }[])
                    .map(
                        (config) => `
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(
                            `${SELF_URL}/test?words`,
                        )}&amp;noCache=YES&amp;pdfOptions=${encodeURIComponent(
                            JSON.stringify(config.pdfOptions),
                        )}" target="_blank">${config.name}</a></li>
        `,
                    )
                    .join('\n')}
            </ul> */}

            <GitHubCorner />
        </>
    );
}
