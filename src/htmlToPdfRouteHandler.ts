import { RequestHandler } from 'express';
import { ERROR_WRONG_URL } from './config';
import { getConvertedFile } from './getConvertedFile';


export const htmlToPdfRouteHandler: RequestHandler = async (
    { query: { url, download, nocache } },
    res,
    next,
) => {
    try {
        const content = await getConvertedFile(url, nocache!!);
        res.contentType('application/pdf');
        //todo download or view
        res.header(
            'Content-disposition',
            `${download ? `attachment; filename="${download}.pdf"` : 'inline'}`,
        );
        res.send(content);
    } catch (error) {
        //todo handle other type of errors
        res.status(404).send(ERROR_WRONG_URL);
        //next(error);
    }
};
