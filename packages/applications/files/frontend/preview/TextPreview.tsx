/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as React from "react";
import CodeStudioEditor from "applications/code_studio/frontend/core/editor/editor";
import csi from "web-client/src/helpers/csi";
import getParserForFileExtension from "applications/code_studio/frontend/core/editor/languageParser/parserLookup";
import * as pathBrowserify from "path-browserify";
import CodeStudioLanguageParser from "applications/code_studio/frontend/core/editor/languageParser/parser";
import { IconButton } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface ITextPreview {
  path: string;
}

const TextPreview: React.FC<ITextPreview> = ( { path = "" } ) => {
  const ref = React.useRef<HTMLDivElement>( null );
  const [formatJson, setFormatJson] = React.useState( getParserForFileExtension( pathBrowserify.extname( path ).replace( ".", "" ) ) === "json" );
  
  React.useEffect( () => {
    if ( !ref.current ) {
      return;
    }
    
    const editor = new CodeStudioEditor( ref.current );
    
    // @ts-ignore
    csi.postText( "/app/files/get/file", { path }, resp => {
      let content = resp;
      
      if ( formatJson ) {
        // eslint-disable-next-line no-magic-numbers
        content = JSON.stringify( JSON.parse( content ), null, 2 );
      }
      
      let parser = new CodeStudioLanguageParser( getParserForFileExtension( pathBrowserify.extname( path ).replace( ".", "" ) ) );
      
      if ( !parser ) {
        parser = new CodeStudioLanguageParser( "plainText" );
      }
      
      console.log( content );
      console.log( parser );
      
      editor._debugRenderParsedString( content, parser );
    } );
    
  }, [!!ref.current, path, formatJson] );
  
  return (
    <section className={"flex flex-col gap-2"}>
      <div className={"flex gap-1"}>
        <IconButton
          icon={YourDashIcon.ArrowSwitch}
          onClick={() => {
            setFormatJson( !formatJson );
          }}
        />
      </div>
      <div data-yourdash-codestudio-editor="true" className={"overflow-auto w-full p-2"} ref={ref}/>
    </section>
  );
};

export default TextPreview;
