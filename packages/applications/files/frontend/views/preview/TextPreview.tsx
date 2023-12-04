/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import CodeStudioEditor from "applications/code_studio/frontend/core/editor/editor";
import csi from "web-client/src/helpers/csi";
import getParserForFileExtension from "applications/code_studio/frontend/core/editor/editor";
import * as pathBrowserify from "path-browserify";
import { IconButton } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface ITextPreview {
  path: string;
}

const TextPreview: React.FC<ITextPreview> = ( { path = "" } ) => {
  const ref = React.useRef<HTMLDivElement>( null );
  const [ formatJson, setFormatJson ] = React.useState( getParserForFileExtension( pathBrowserify.extname( path ).replace( ".", "" ) ) === "json" );

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

      editor.renderParsedString( content, parser );
    } );

  }, [ !!ref.current, path, formatJson ] );

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
