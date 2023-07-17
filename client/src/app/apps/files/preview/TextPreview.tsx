import React, { useEffect, useRef } from "react";
import CodeStudioEditor from "../../code_studio/core/editor/editor";
import csi from "helpers/csi";
import getParserForFileExtension, { getParserForLanguage } from "../../code_studio/core/editor/languageParser/parserLookup";
import pathBrowserify from "path-browserify";
import CodeStudioPlainTextLanguageParser from "../../code_studio/core/editor/languageParser/lang/plainText";
import CodeStudioLanguageParser from "../../code_studio/core/editor/languageParser/parser";

export interface ITextPreview {
  path: string;
}

const TextPreview: React.FC<ITextPreview> = ( { path = "" } ) => {
  const ref = useRef<HTMLDivElement>( null );
  
  useEffect( () => {
    if ( !ref.current ) {
      return;
    }
    
    const editor = new CodeStudioEditor( ref.current );
    
    // @ts-ignore
    csi.postText( "/app/files/get/file", { path }, resp => {
      let parser = new CodeStudioLanguageParser( getParserForFileExtension( pathBrowserify.extname( path ).replace( ".", "" ) ) );
      
      if ( !parser ) {
        parser = new CodeStudioLanguageParser( "plainText" );
      }
      
      editor._debugRenderParsedString( resp, parser );
    } );
    
  }, [!!ref.current, path] );
  
  return <div data-yourdash-codestudio-editor="true" className={"overflow-auto w-full p-2"} ref={ref}/>;
};

export default TextPreview;
