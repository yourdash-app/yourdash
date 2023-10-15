/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import { MajorButton, TextInput } from "../../../../ui/index";

export interface IInstanceSelector {
  setInstanceUrl: ( value: string ) => void
}

const InstanceSelector: React.FC<IInstanceSelector> = ( { setInstanceUrl } ) => {
  const [uncheckedInstanceUrl, setUncheckedInstanceUrl] = useState<string>( "" );
  
  return <div className={"w-full h-full flex items-center justify-center flex-col gap-4"}>
    <span className={"animate__animated animate__fadeIn text-4xl font-semibold"}>Choose an Instance</span>
    <TextInput
      label={"Instance URL"}
      onChange={() => {}}
      onValid={( val ) => {
        if ( val.indexOf( ":" ) === -1 ) {
          setUncheckedInstanceUrl( val );
        } else {
          setUncheckedInstanceUrl( `${ val }:3563` );
        }
      }}
      mustMatchRegex={/^(?:https?:\/\/)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?|localhost(?::\d+)?|(?!.*\.$)[\w.-]+\.[a-z]{2,})(?::\d+)?$/}
      placeholder={"https://example.com"}
    />
    <MajorButton
      className={"pl-8 pr-8"}
      onClick={() => {
        fetch( `${uncheckedInstanceUrl}/test` )
          .then( res => res.json() )
          .then( json => {
            if ( json.type === "yourdash" ) {
              setInstanceUrl( uncheckedInstanceUrl );
            } else {
              alert( "This is not a valid YourDash instance" );
            }
          } )
          .catch( err => {
            alert( "This is not a valid YourDash instance" );
          } )
      }}
    >
      Continue
    </MajorButton>
  </div>
}

export default InstanceSelector