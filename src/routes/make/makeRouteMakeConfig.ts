import { ConfigChecker } from 'configchecker';
import { PuppeteerLifeCycleEvent } from 'puppeteer';
import { IMakeConfig, IMakeConfigJpeg, IMakeConfigPdf } from './IMakeConfig';

// prettier-ignore
// TODO: Ignore only one block when it will be possible https://github.com/prettier/prettier/issues/5287
export function makeRouteMakeConfig(query: ConfigChecker): IMakeConfig {

    // Common
    const url = query.get('url').url().required().value;
    const type = query.get('type').asType<'pdf'|'png'|'jpeg'>().required().value;
    const download = query.get('download').boolean().default(false).value!;
    const incognito = query.get('incognito').boolean().default(false).value!;
    const waitUntil = query.get('waitUntil').asType<PuppeteerLifeCycleEvent>().value;
    const renderOnCallback = query.get('renderOnCallback').value;

    const common = {url,download,incognito,waitUntil,renderOnCallback};

    switch(type){
        case 'pdf':
        {
            const scale=query.get('scale').number().value;
            const printBackground=query.get('printBackground').boolean().default(false).value!;
            const landscape=query.get('landscape').boolean().default(false).value!;
            const pageRanges=query.get('pageRanges').value;
            const format=query.get('format').value;
            const width=query.get('width').value;
            const height=query.get('height').value;
            const marginTop=query.get('marginTop').value;
            const marginRight=query.get('marginRight').value;
            const marginBottom=query.get('marginBottom').value;
            const marginlLeft=query.get('marginlLeft').value;
            const preferCSSPageSize=query.get('preferCSSPageSize').boolean().default(false).value!;
            const headerTemplate=query.get('headerTemplate').value;
            const footerTemplate=query.get('footerTemplate').value;

            const margin = {top:marginTop,right:marginRight,bottom:marginBottom,left:marginlLeft};

            return({...common,type,scale,printBackground,landscape,pageRanges,format,width,height,margin,preferCSSPageSize,headerTemplate,footerTemplate} as IMakeConfigPdf);
        }
        case 'jpeg':
        case 'png':
        {
            const width=query.get('width').number().value;
            const height=query.get('height').number().value;
            const fullPage =query.get('clipX').boolean().default(false).value!;
            const clipX=query.get('clipX').number().value;
            const clipY=query.get('clipY').number().value;
            const clipWidth=query.get('clipWidth').number().value;
            const clipHeight=query.get('clipHeight').number().value;
            const omitBackground=query.get('omitBackground').boolean().default(false).value!;

            const clip = (clipX&&clipY&&clipWidth&&clipHeight)?{x:clipX,y:clipY,width:clipWidth,height:clipHeight}:undefined;
            const quality=query.get('quality').number().value;

            return({...common,type,quality,width,height,fullPage,clip,omitBackground} as IMakeConfigJpeg);
        }

    }




}
