import { RequestHandler } from 'express';
import { getConvertedFile } from '../pdf/getConvertedFile';
import { ConfigChecker } from 'configchecker';
import { LoadEvent } from 'puppeteer';

export const htmlToPdfRouteHandler: RequestHandler = async (request, response, next) => {
    const query = ConfigChecker.from(request.query);
    const errorMessage = query.get('errorMessage').value;

    try {
        const url = query
            .get('url', 'Url which will be converted to pdf.')
            .url()
            .required().value;
        const download = query.get(
            'download',
            'Will be file downloaded and its name will be this param. If not set (the default option) just shown by a browser.',
        ).value;
        const nocache = query
            .get('nocache', 'Do not use cache and regenerate the pdf.')
            .boolean()
            .default(false).value!;

        const renderOnCallback = query.get('renderOnCallback', 'Render after calling window[renderOnCallback].').value;

        const waitUntil = query
            .get('waitUntil', 'Wait until (see https://pptr.dev/#?product=Puppeteer&show=api-pagegotourl-options).')
            .asType<LoadEvent>().value;

        /*if(renderOnCallback && renderOnCallback!=='callPhantom'){
            throw new Error('Callback must be exactly "callPhantom". In future this will be repaired.');
        }*/

        // TODO: Pass file name in query parameters
        const content = await getConvertedFile(url.toString(), nocache, renderOnCallback, waitUntil);

        return response
            .contentType('application/pdf')
            .header('Content-disposition', `${download ? `attachment; filename="${download}.pdf"` : 'inline'}`)
            .send(content);
    } catch (error) {
        //TODO: handle other type of errors
        console.error(error);
        if (!errorMessage) {
            return response.status(400).send({
                status: 'ERROR',
                message: error.message.replace('In config', 'In GET params' /*TODO: Native in configchecker*/),
                //error,
            });
        } else {
            return response.status(400).send(errorMessage);
        }
    }
};
