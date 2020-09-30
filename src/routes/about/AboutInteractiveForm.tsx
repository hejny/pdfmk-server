import React from 'react';
import { SELF_URL } from '../../config';

// TODO: Take defaults from config not from hardcoded puppeteer options
// TODO: Show names or prepared URL
export function AboutInteractiveForm() {
    return (
        <form action="../make" method="get" target="_blank">
            <h3>Browser</h3>
            <p>
                <label>
                    <b>Url:</b>
                    <input type="text" name="url" placeholder={`${SELF_URL}/test`} />
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" name="incognito" />
                    Use <b>incognito</b> browser tab.
                </label>
            </p>
            <h3>Timing</h3>
            <p>
                <label>
                    <b>Wait until:</b>
                    <select name="waitUntil">
                        <option value="" selected>
                            &lt;Do not wait&gt;
                        </option>
                        <option value="load">load</option>
                        <option value="domcontentloaded">domcontentloaded</option>
                        <option value="networkidle0">networkidle0</option>
                        <option value="networkidle2">networkidle2</option>
                    </select>
                </label>
            </p>
            <p>
                <label>
                    <b>Render on callback:</b>
                    <input type="text" name="renderOnCallback" placeholder="renderMe" />
                </label>
            </p>
            <h3>Conversion</h3>
            <p>
                <label>
                    <input type="radio" name="format" value="pdf" />
                    Convert page into <b>PDF</b> document.
                </label>
                <label>
                    <input type="radio" name="format" value="png" />
                    Convert page into <b>PNG</b> image.
                </label>
                <label>
                    <input type="radio" name="format" value="jpg" />
                    Convert page into <b>JSG</b> image.
                </label>
            </p>
            <p>
                <label>
                    Scale of the webpage rendering: <i>(Default is 1)</i>
                    <input type="number" name="scale" placeholder="1" />
                </label>
            </p>
            <p>
                <label>
                    Print background graphics: <i>(Default is false)</i>
                    <select name="printBackground">
                        <option value="true">true</option>
                        <option value="false" selected>
                            false
                        </option>
                    </select>
                </label>
            </p>
            <p>
                <label>
                    Paper orientation.: <i>(Default is false)</i>
                    <select name="landscape">
                        <option value="true">true</option>
                        <option value="false" selected>
                            false
                        </option>
                    </select>
                </label>
            </p>
            <p>
                <label>
                    Paper ranges to print, e.g., '1-5, 8, 11-13'.: <i>(Default is "" which means print all pages)</i>
                    <input type="text" name="pageRanges" placeholder="1-5, 8, 11-13" />
                </label>
            </p>
            <p>
                <label>
                    Paper format. If set, takes priority over width or height options.: <i>(Default is "Letter")</i>
                    <select name="format">
                        <option value="Legal" selected>
                            Legal
                        </option>
                        <option value="Tabloid">Tabloid</option>
                        <option value="Ledger">Ledger</option>
                        <option value="A0">A0</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                        <option value="A5">A5</option>
                        <option value="A6">A6</option>
                    </select>
                </label>
            </p>
            <p>
                <label>
                    <b>Width:</b>
                    <input type="string" name="width" placeholder="21cm" />
                </label>
                <label>
                    <b>Height:</b>
                    <input type="string" name="height" placeholder="29.7cm" />
                </label>
                <i>Values can be in pixels like "1920" or in other units "29.7cm".</i>
            </p>
            <p>
                <label>
                    <b>Top:</b>
                    <input type="string" name="top" placeholder="1cm" />
                </label>
                <label>
                    <b>Right:</b>
                    <input type="string" name="top" placeholder="1cm" />
                </label>
                <label>
                    <b>Bottom:</b>
                    <input type="string" name="top" placeholder="1cm" />
                </label>
                <label>
                    <b>Left:</b>
                    <input type="string" name="top" placeholder="1cm" />
                </label>
                <i>Values can be in pixels like "1920" or in other units "29.7cm".</i>
            </p>
            <p>
                <label>
                    Give any CSS page size declared in the page priority over what is declared in width and * height or
                    format options.: <i>(Default is false which will scale the content to fit the paper size.</i>
                    <select name="preferCSSPageSize">
                        <option value="true">true</option>
                        <option value="false" selected>
                            false
                        </option>
                    </select>
                </label>
            </p>
            <h3>Page additional</h3>
            <p>
                <label>
                    <b>Header</b>
                    <textarea name="headerTemplate"></textarea>
                </label>
                <label>
                    <b>Footer</b>
                    <textarea name="footerTemplate"></textarea>
                </label>
                Both should be valid HTML markup with following classes used to inject printing values into them:
                <ul>
                    <li>
                        <b>date</b> formatted print date
                    </li>
                    <li>
                        <b>title</b> document title
                    </li>
                    <li>
                        <b>url</b> document location
                    </li>
                    <li>
                        <b>pageNumber</b> current page number
                    </li>
                    <li>
                        <b>totalPages</b> total pages in the document
                    </li>
                </ul>
            </p>
            <h3>Postprocessing</h3>
            <p>TODO:</p>
            <h3>Cashing</h3>
            <p>TODO:</p>
            <h3>Output</h3>

            <p>
                <label>
                    <input type="checkbox" name="download" />
                    <b>Download</b> instead of showing in browser tab.
                </label>
            </p>

            <p>
                <label>
                    <b>Error message:</b>
                    <textarea name="errorMessage" placeholder="Sorry, there was a problem..."></textarea>
                </label>
            </p>

            <input type="submit" value="Generate" />
        </form>
    );
}

/*
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

*/
