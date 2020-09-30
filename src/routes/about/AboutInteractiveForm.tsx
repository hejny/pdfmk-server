import React from 'react';
import { SELF_URL } from '../../config';

export function AboutInteractiveForm() {
    return (
        <form action="../make" method="get" target="_blank">
            <h3>Browser</h3>
            <p>
                <label>
                    <b>Url:</b>
                    <input type="text" name="url" placeholder="${SELF_URL}/test" />
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" name="incognito" />
                    Use <b>incognito</b> browser tab.
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
                <i>
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
                </i>
            </p>

            <h3>Postprocessing</h3>
            <p>TODO:</p>

            <h3>Cashing</h3>
            <p>TODO:</p>

            <input type="submit" value="Generate" />
        </form>
    );
}

`
  /**
   * Scale of the webpage rendering.
   * @default 1
   */
  scale?: number;




  /**
   * Print background graphics.
   * @default false
   */
  printBackground?: boolean;
  /**
   * Paper orientation.
   * @default false
   */
  landscape?: boolean;
  /**
   * Paper ranges to print, e.g., '1-5, 8, 11-13'.
   * @default '' which means print all pages.
   */
  pageRanges?: string;
  /**
   * Paper format. If set, takes priority over width or height options.
   * @default 'Letter'
   */
  format?: PDFFormat;
  /** Paper width. */
  width?: LayoutDimension;
  /** Paper height. */
  height?: LayoutDimension;
  /** Paper margins, defaults to none. */
  margin?: {
    /** Top margin. */
    top?: LayoutDimension;
    /** Right margin. */
    right?: LayoutDimension;
    /** Bottom margin. */
    bottom?: LayoutDimension;
    /** Left margin. */
    left?: LayoutDimension;
  };
  /**
   * Give any CSS @page size declared in the page priority over what is declared in width and
   * height or format options.
   * @default false which will scale the content to fit the paper size.
   */
  preferCSSPageSize?: boolean;

`;

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
