import React from 'react';
import { SELF_URL } from '../../config';

// TODO: Take defaults from config not from hardcoded puppeteer options
// TODO: Show names or prepared URL
export function AboutInteractiveForm() {
    return (
        <form action={`${SELF_URL}/make`} method="get" target="_blank">
            <h3>Browser</h3>
            <div className="field">
                <label>
                    <b>Url:</b>
                    <input type="text" name="url" placeholder={`${SELF_URL}/test`} />
                </label>
            </div>
            <div className="field">
                <label>
                    <input type="checkbox" name="incognito" value="yes" />
                    Use <b>incognito</b> browser tab.
                </label>
            </div>
            <h3>Timing</h3>
            <div className="field">
                <label>
                    <b>Wait until: </b>
                    <i>
                        <a href="https://pptr.dev/#?product=Puppeteershow=api-pagegotourl-options">(see more)</a>
                    </i>
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
            </div>
            <div className="field">
                <label>
                    <b>Render on callback:</b>
                    <input type="text" name="renderOnCallback" placeholder="renderMe" />
                </label>
            </div>

            {/* TODO: We can add here waiting for selector */}

            <h3>Output</h3>

            <div className="field">
                <label>
                    <input type="radio" name="type" value="pdf" />
                    Convert page into <b>PDF</b> document.
                </label>
                <label>
                    <input type="radio" name="type" value="png" />
                    Convert page into <b>PNG</b> image.
                </label>
                <label>
                    <input type="radio" name="type" value="jpeg" />
                    Convert page into <b>JPEG</b> image.
                </label>
            </div>

            <div className="field">
                <label>
                    <input type="checkbox" name="download" value="yes" />
                    <b>Download</b> instead of showing in browser tab.
                </label>
            </div>
            <div className="field">
                <label>
                    <b>Error message:</b> <i>(Write "DEBUG" if you want to see more technical info.)</i>
                    <textarea name="errorMessage" placeholder="Sorry, there was a problem..."></textarea>
                </label>
            </div>

            <div className="only-images">
                <h3>Conversion for Images</h3>

                <div className="only-jpeg">
                    <label>
                        The quality of the image, between 0-100. <i>(Only for JPEG)</i>
                        <input type="number" name="quality" placeholder="80" />
                    </label>
                </div>
                <div className="field">
                    <label>
                        When true, takes a screenshot of the full scrollable page.
                        <select name="fullPage">
                            <option value="true">true</option>
                            <option value="false" selected>
                                false
                            </option>
                        </select>
                    </label>
                </div>
                <div className="field">
                    <b>An object which specifies clipping region of the page:</b> <i>(Default is none)</i>
                    <label>
                        <b className="fix">X:</b>
                        <input type="number" name="clipX" placeholder="100" />
                    </label>
                    <label>
                        <b className="fix">Y:</b>
                        <input type="number" name="clipY" placeholder="100" />
                    </label>
                    <label>
                        <b className="fix">Width:</b>
                        <input type="number" name="clipWidth" placeholder="200" />
                    </label>
                    <label>
                        <b className="fix">Height:</b>
                        <input type="number" name="clipHeight" placeholder="200" />
                    </label>
                    <i>Values can be in pixels like "1920" or in other units "29.7cm".</i>
                </div>
                <div className="field">
                    <label>
                        Hides default white background and allows capturing screenshots with transparency.{' '}
                        <i>(Default is false)</i>
                        <select name="omitBackground">
                            <option value="true">true</option>
                            <option value="false" selected>
                                false
                            </option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="only-pdf">
                <h3>Conversion for PDF</h3>
                <div className="field">
                    <label>
                        Scale of the webpage rendering: <i>(Default is 1)</i>
                        <input type="number" name="scale" placeholder="1" />
                    </label>
                </div>
                <div className="field">
                    <label>
                        Print background graphics: <i>(Default is false)</i>
                        <select name="printBackground">
                            <option value="true">true</option>
                            <option value="false" selected>
                                false
                            </option>
                        </select>
                    </label>
                </div>
                <div className="field">
                    <label>
                        Paper orientation.: <i>(Default is false)</i>
                        <select name="landscape">
                            <option value="true">true</option>
                            <option value="false" selected>
                                false
                            </option>
                        </select>
                    </label>
                </div>
                <div className="field">
                    <label>
                        Paper ranges to print, e.g., '1-5, 8, 11-13'.:{' '}
                        <i>(Default is "" which means print all pages)</i>
                        <input type="text" name="pageRanges" placeholder="1-5, 8, 11-13" />
                    </label>
                </div>
                <div className="field">
                    <label>
                        <b>Paper format:</b> <i>(If set, takes priority over width or height options bellow.)</i>
                        <select name="format">
                            <option value="" selected>
                                &lt;Do not set&gt;
                            </option>
                            <option value="Legal">Legal</option>
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
                </div>
                <div className="field">
                    <b>Paper size:</b> <i>(It can be overwritten by Paper format.)</i>
                    <label>
                        <b className="fix">Width:</b>
                        <input type="string" name="width" placeholder="21cm" />
                    </label>
                    <label>
                        <b className="fix">Height:</b>
                        <input type="string" name="height" placeholder="29.7cm" />
                    </label>
                    <i>Values can be in pixels like "1920" or in other units "29.7cm".</i>
                </div>
                <div className="field">
                    <b>Margin:</b>
                    <label>
                        <b className="fix">Top:</b>
                        <input type="string" name="marginTop" placeholder="1cm" />
                    </label>
                    <label>
                        <b className="fix">Right:</b>
                        <input type="string" name="marginRight" placeholder="1cm" />
                    </label>
                    <label>
                        <b className="fix">Bottom:</b>
                        <input type="string" name="marginBottom" placeholder="1cm" />
                    </label>
                    <label>
                        <b className="fix">Left:</b>
                        <input type="string" name="marginleft" placeholder="1cm" />
                    </label>
                    <i>Values can be in pixels like "1920" or in other units "29.7cm".</i>
                </div>
                <div className="field">
                    <label>
                        Give any CSS page size declared in the page priority over what is declared in width and * height
                        or format options.: <i>(Default is false which will scale the content to fit the paper size.</i>
                        <select name="preferCSSPageSize">
                            <option value="true">true</option>
                            <option value="false" selected>
                                false
                            </option>
                        </select>
                    </label>
                </div>
                <h3>Page additional for PDF</h3>
                <div className="field">
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
                </div>
            </div>

            <h3>Postprocessing for Images</h3>
            <div className="field">TODO:</div>
            <h3>Cashing</h3>
            <div className="field">TODO:</div>

            <h3>Summary</h3>
            <input type="submit" value="Generate" />
            <style>
                {`
                /* TODO: To better place */
                

                form {
                    max-width: 600px;
                    padding: 10px;
                    border: 2px solid #ccc;
                }

                form h3 {
                    border-bottom: 2px solid #ccc;
                }

                form input {
                    margin-left: 10px;
                }
                
                form textarea {
                    display: block;
                }

                form label {
                    display: block;
                }

                form .field {
                    margin: 10px;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }

                form .fix {
                    display: inline-block;
                    width: 100px;
                }



            `}
            </style>
        </form>
    );
}

/*
<div className="field"><label>
    <b>importAsMaterialize:</b><br/>
    <i>Place here url of another existing board</i><br/>
    <input type="text" name="importAsMaterialize" />
    </label></div>

    <div className="field"><label>
    <b>importAsLink:</b><br/>
    <i>Place here url of another existing board</i><br/>
    <i>NOTE: TODO: This is not working yet.</i><br/>
    <input type="text" name="importAsLink" />
    </label></div>

    <div className="field">
    <b>pluginsOn:</b><br/>
    <i>Place here name of plugins listed bellow or keep it empty</i><br/>
    <input type="text" name="pluginsOn[]" /><br/>
    <input type="text" name="pluginsOn[]" /><br/>
    <input type="text" name="pluginsOn[]" /><br/>
    <input type="text" name="pluginsOn[]" />
    </div>

    <div className="field">
    <b>pluginsOff:</b><br/>
    <i>Place here name of plugins listed bellow or keep it empty</i><br/>
    <input type="text" name="pluginsOff[]" /><br/>
    <input type="text" name="pluginsOff[]" /><br/>
    <input type="text" name="pluginsOff[]" /><br/>
    <input type="text" name="pluginsOff[]" />
    </div>

    <div className="field"><label>
        <input type="radio" name="redirect" value="false"/>
        Show the JSON info about newly created board
    </label></div>
    <div className="field"><label>
        <input type="radio" name="redirect" value="true"/>
        Redirect me to the board
    </label></div>

*/
