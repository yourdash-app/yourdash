import React from "react";
import TextPreview from "./TextPreview";
import ImagePreview from "./ImagePreview";
import pathBrowserify from "path-browserify";

export interface IPreview {
  path: string,
}

const Preview: React.FC<IPreview> = ( { path } ) => {
  const [previewType, setPreviewType] = React.useState<"image" | "text" | null>( null );
  
  React.useEffect( () => {
    const extension = pathBrowserify.extname( path ).replace( ".", "" );
    
    switch ( extension ) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
    case "svg":
    case "avif":
      setPreviewType( "image" );
      break;
    default:
      setPreviewType( "text" );
    }
  }, [path] );
  
  switch ( previewType ) {
  case "image":
    return <ImagePreview path={path}/>;
    
  case "text":
    return <TextPreview path={path}/>;
    
  default:
    return (
      <main className={"w-full h-full flex items-center justify-center overflow-hidden font-semibold text-5xl tracking-wide animate__animated animate__fadeIn"}>
        <h1>{"Detecting file type..."}</h1>
      </main>
    );
  }
};

export default Preview;
