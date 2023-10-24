/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import csi from "web-client/src/helpers/csi";

export interface IImagePreview {
  path: string;
}

const ImagePreview: React.FC<IImagePreview> = ( { path = "" } ) => {
  const [image, setImage] = React.useState<string | null>( null );
  
  React.useEffect( () => {
    // @ts-ignore
    csi.postText( "/app/files/get/file", { path }, resp => {
      setImage( resp );
    } );
    
  }, [path] );
  
  if ( !image ) {
    return null;
  }
  
  return (
    <main className={"w-full h-full flex items-center justify-center overflow-auto"}>
      <img alt={""} src={`${ csi.getInstanceUrl() }${ image }`}/>
    </main>
  );
};

export default ImagePreview;
