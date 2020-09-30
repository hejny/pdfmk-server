import React from 'react';

export function TestPage() {
    return (
        <>
            <h1>PDF Maker – printing test</h1>

            <p id="js-test"></p>
            <p>
                And countdown for testing the waiting section is
                <b id="countdown">3</b>.
            </p>
            <script>
                {`
                // TODO: To better place
                // TODO: ES6 Working module
                document.getElementById("js-test").innerHTML = 'Javascript inside the page is working. ES6 <b>not</b> working.';
                `}
            </script>
            <script>
                {`
                 // TODO: To better place
                document.getElementById("js-test").innerHTML = \`Javascript inside the page is working. ES6 is working.\`;
                `}
            </script>

            <p id="words"></p>

            <script>
                {`
                // TODO: To better place
                var i = 2;
                var interval = setInterval(function(){
                    document.getElementById("countdown").innerHTML = i;
                    if(i===0){
                        clearInterval(interval);
                        window.renderMe();
                    }
                    i--;
                },1000);
            `}
            </script>

            <script>
                {`
                // TODO: To better place
                if(location.search==='?words'){
                    var words = '';
                    for(var j=0;j<10000;j++){
                        words+='foo ';
                    }
                    document.getElementById("words").innerHTML = words;
                }
            `}
            </script>

            <style>
                {`
                // TODO: To better place
                @media print {
                    body{
                        margin: 0;
                        padding: 0;
                    }
                }
            `}
            </style>
        </>
    );
}
