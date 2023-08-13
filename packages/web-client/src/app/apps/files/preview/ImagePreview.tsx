import React, { useEffect, useState } from "react";
import csi from "helpers/csi";

export interface IImagePreview {
  path: string;
}

const ImagePreview: React.FC<IImagePreview> = ( { path = "" } ) => {
  const [image, setImage] = useState<string | null>( null );
  
  useEffect( () => {
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
