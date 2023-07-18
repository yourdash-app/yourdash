import React, { useEffect, useRef } from "react";
import CodeStudioEditor from "../../code_studio/core/editor/editor";
import csi from "helpers/csi";
import getParserForFileExtension, { getParserForLanguage } from "../../code_studio/core/editor/languageParser/parserLookup";
import pathBrowserify from "path-browserify";
import CodeStudioPlainTextLanguageParser from "../../code_studio/core/editor/languageParser/lang/plainText";
import CodeStudioLanguageParser from "../../code_studio/core/editor/languageParser/parser";
import { IconButton } from "../../../../ui";

export interface ITextPreview {
  path: string;
}

const TextPreview: React.FC<ITextPreview> = ( { path = "" } ) => {
  const ref = useRef<HTMLDivElement>( null );
  const [formatJson, setFormatJson] = React.useState( getParserForFileExtension( pathBrowserify.extname( path ).replace( ".", "" ) ) === "json" );
  
  useEffect( () => {
    if ( !ref.current ) {
      return;
    }
    
    const editor = new CodeStudioEditor( ref.current );
    
    // @ts-ignore
    csi.postText( "/app/files/get/file", { path }, resp => {
      let content = resp;
      
      if ( formatJson ) {
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
          icon="arrow-switch-16"
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
