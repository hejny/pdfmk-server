import { RequestHandler } from 'express';
import { SELF_URL } from '../config';
import { version } from 'punycode';

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
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;nocache=YES" target="_blank">Print me & show!</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;nocache=YES&amp;download=page">Print me & download as page.pdf!</a></li>
            </ul>

            <h2>Error handling</h2>
            <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/200`)}&amp;nocache=YES" target="_blank">OK (200) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/400`)}&amp;nocache=YES" target="_blank">Bad Request (400) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/401`)}&amp;nocache=YES" target="_blank">Unauthorized (401) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/403`)}&amp;nocache=YES" target="_blank">Forbidden (403) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/404`)}&amp;nocache=YES" target="_blank">Not Found (404) </a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test/httpStatusCode/500`)}&amp;nocache=YES" target="_blank">Internal Server Error (500)</a></li>
            </ul>
            
            <h2>Waiting</h2>
            <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;nocache=YES&amp;renderOnCallback=renderMe" target="_blank">Print me but wait until countdown.</a></li>
            </ul>
            <p>TODO: In future there will be more options of waiting then renderOnCallback</p>
            
            <h2>Advanced content</h2>
            <ul>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test?words`)}&amp;nocache=YES" target="_blank">Print me with multiple pages of text.</a></li>
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
