import { RequestHandler } from 'express';
import { PDFOptions } from 'puppeteer';
import { SELF_URL, version } from '../config';

// prettier-ignore
export const testRouteHandler: RequestHandler = async (request, response, next) => {
    response.send(`
       
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

        <h2>PDF options</h2>
        <ul>
        ${([
            {
                name: 'Format A4',
                pdfOptions: {format: 'A4' }
            },
            {
                name: 'Format A5',
                pdfOptions: {format: 'A5' }
            },
            {
                name: 'Format 9cm x 5cm (VCard)',
                pdfOptions: {format: null, width: '9cm',height:'5cm' }
            },
            {
                name: 'Format A4, margin 1cm',
                pdfOptions: {format: null, margin: { left: '1cm', top: '1cm', right: '1cm', bottom: '1cm' } }
            },
            {
                name: 'Format A4, no margin',
                pdfOptions: {margin: { left: 0, top: 0, right: 0, bottom: 0 } }
            },
            {
                name: 'Format 10cm x 10cm, margin 2cm',
                pdfOptions: {format: null, width: '10cm',height:'10cm', margin: { left: '2cm', top: '2cm', right: '2cm', bottom: '2cm' } }
            },
        ] as {name: string, pdfOptions:Partial<PDFOptions>}[]).map((config)=>`
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test?words`)}&amp;noCache=YES&amp;pdfOptions=${encodeURIComponent(JSON.stringify(config.pdfOptions))}" target="_blank">${config.name}</a></li>
        `).join('\n')}
        
        </ul>


        <h2>Interactive</h2>

        <form action="../new" method="post" target="_blank">


            <p><label>
                <b>Board name:</b>
                <input type="text" name="name" placeholder="My awesome board" />
            </label></p>

            <p><label>
            <b>importAsMaterialize:</b><br/>
            <i>Place here url of another existing board</i><br/>
            <input type="text" name="importAsMaterialize" />
            </label></p>

            <p><label>
            <b>importAsLink:</b><br/>
            <i>Place here url of another existing board</i><br/>
            <i>NOTE: TODO: This is not working yet.</i><br/>
            <input type="text" name="importAsLink" />
            </label></p>

            <p>
            <b>pluginsOn:</b><br/>
            <i>Place here name of plugins listed bellow or keep it empty</i><br/>
            <input type="text" name="pluginsOn[]" /><br/>
            <input type="text" name="pluginsOn[]" /><br/>
            <input type="text" name="pluginsOn[]" /><br/>
            <input type="text" name="pluginsOn[]" />
            </p>

            <p>
            <b>pluginsOff:</b><br/>
            <i>Place here name of plugins listed bellow or keep it empty</i><br/>
            <input type="text" name="pluginsOff[]" /><br/>
            <input type="text" name="pluginsOff[]" /><br/>
            <input type="text" name="pluginsOff[]" /><br/>
            <input type="text" name="pluginsOff[]" />
            </p>

            <p><label>
                <input type="radio" name="redirect" value="false"/>
                Show the JSON info about newly created board
            </label></p>
            <p><label>
                <input type="radio" name="redirect" value="true"/>
                Redirect me to the board
            </label></p>


            <input type="submit" value="Generate">
        </form>


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

        <style>
            @media print {
                body{
                    margin: 0;
                    padding: 0;
                }
            }
        <style>


        <a href="https://github.com/hejny/pdf-maker" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
        
        
    `);
};
