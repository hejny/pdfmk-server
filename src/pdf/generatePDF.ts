import { readFileSync } from 'fs';
import puppeteer from 'puppeteer';

export async function generatePDF(url: string, filePath: string, renderOnCallback?: string): Promise<Buffer> {
    //try {


        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: ['networkidle2'/*,'domcontentloaded'*/]});
        if(renderOnCallback){

            // TODO: This is a bit hack can it be done somehow better?
            await page.evaluate(`window.${renderOnCallback} = ()=>{
                
                const renderNow = document.createElement("SPAN");
                renderNow.classList.add('renderNow');
                renderNow.innerHtml = 'xxxxx';
                document.body.appendChild(renderNow);
                
            }
            //window.${renderOnCallback}();
            `);
            await page.waitForSelector('.renderNow');
        }
        await page.pdf({path: filePath, format: 'A4'});
        await browser.close();


        return readFileSync(filePath);

        // TODO: Delete cache files

    /*} catch (error) {
        console.error(error);
        throw new Error(`Error when creating`);
    }*/
}
