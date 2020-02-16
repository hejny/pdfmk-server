import { RequestHandler } from 'express';
import { SELF_URL } from '../config';
import { version } from '../config';

// prettier-ignore
export const testRouteHandler: RequestHandler = async (request, response, next) => {
    response.send(`
        <ul>
            <h1>PDF Maker</h1>
            

            <h2>Service information</h2>

            <p>Version: ${version}</p>

            <p id="js-test"></p>
            <p>
            And countdown for testing the waiting section is
            <b id="countdown">3</b>.
            </p>
            <script>
                document.getElementById("js-test").innerHTML = 'Javascript inside the page is working. ES6 <b>not</b> working.';
            </script>
            <script>
                document.getElementById("js-test").innerHTML = \`Javascript inside the page is working. ES6 is working.\`;
            </script>

            <h2>Basics</h2>
            <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;noCache=YES" target="_blank">Print me & show!</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;noCache=YES&amp;download=page">Print me & download as page.pdf!</a></li>
            </ul>

            <h2>Error handling</h2>
            <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/200`)}&amp;noCache=YES" target="_blank">OK (200) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/400`)}&amp;noCache=YES" target="_blank">Bad Request (400) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/401`)}&amp;noCache=YES" target="_blank">Unauthorized (401) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/403`)}&amp;noCache=YES" target="_blank">Forbidden (403) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/404`)}&amp;noCache=YES" target="_blank">Not Found (404) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/500`)}&amp;noCache=YES" target="_blank">Internal Server Error (500)</a></li>
            </ul>
            
            <h2>Waiting</h2>
            <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;noCache=YES&amp;renderOnCallback=renderMe" target="_blank">Print me but wait until countdown.</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;c=YES&amp;waitUntil=load" target="_blank">Random Wikipedia article, waitUntil=load.</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;noCache=YES&amp;waitUntil=domcontentloaded" target="_blank">Random Wikipedia article, waitUntil=domcontentloaded.</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;noCache=YES&amp;waitUntil=networkidle0" target="_blank">Random Wikipedia article, waitUntil=networkidle0.</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`https://en.wikipedia.org/wiki/Special:Random`)}&amp;noCache=YES&amp;waitUntil=networkidle2" target="_blank">Random Wikipedia article, waitUntil=networkidle2.</a></li>
            </ul>
            <p>See <a href="https://pptr.dev/#?product=Puppeteer&show=api-pagegotourl-options">Puppeteer manual</a> for waitUntil options.</p>
            <p>TODO: In future there will be option of waiting some time</p>
            
            <h2>Advanced content</h2>
            <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test?words`)}&amp;noCache=YES" target="_blank">Print me with multiple pages of text.</a></li>
            </ul>

            <p id="words"><p>

            <script>
                var i = 2;
                var interval = setInterval(function(){
                    document.getElementById("countdown").innerHTML = i;
                    if(i===0){
                        clearInterval(interval);
                        window.renderMe();
                    }
                    i--;
                },1000);
            </script>

            <script>
                if(location.search==='?words'){
                    var words = '';
                    for(var j=0;j<10000;j++){
                        words+='foo ';
                    }
                    document.getElementById("words").innerHTML = words;
                }
            </script>
        
        </ul>
    `);
};
