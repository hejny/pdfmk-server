import { RequestHandler } from 'express';
import { SELF_URL } from '../config';

// prettier-ignore
export const testRouteHandler: RequestHandler = async (request, response, next) => {
    response.send(`
        <ul>
            <h1 id="countdown">3</h1>
            <p id="js-test"></p>
            <script>
                document.getElementById("js-test").innerHTML = 'Javascript inside the page is working. ES6 not working.';
            </script>
            <script>
                document.getElementById("js-test").innerHTML = \`Javascript inside the page is working.\`;
            </script>

            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;nocache=YES" target="_blank">Print me & show!</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;nocache=YES&amp;download=page">Print me & download as page.pdf!</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test`)}&amp;nocache=YES&amp;renderOnCallback=callPhantom" target="_blank">Print me but but until countdown & show!</a></li>
            <li><a href="${SELF_URL}/html/pdf?url=${encodeURIComponent(`${SELF_URL}/test?words`)}&amp;nocache=YES&amp;renderOnCallback=callPhantom" target="_blank">Print me with multiple pages & show!</a></li>

            <p id="words"><p>

            <script>
                var i = 2;
                var interval = setInterval(function(){
                    document.getElementById("countdown").innerHTML = i;
                    if(i===0){
                        clearInterval(interval);
                        window.callPhantom();
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
                    window.callPhantom();
                }
            </script>
        
        </ul>
    `);
};


