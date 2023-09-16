/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import { TextBox, IconButton, TextInput } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface IdbItem {
  item: {
    key: string,
    content: string
  },
  setItemData: ( key: string, content: string ) => void,
  removeKey: ( key: string ) => void
}

const DbItem: React.FC<IdbItem> = ( {
  item,
  setItemData,
  removeKey
} ) => {
  const [active, setActive] = useState<boolean>( false );
  const [key, setKey] = useState<string>( "" );
  const [content, setContent] = useState<string>( "" );
  
  useEffect( () => {
    setKey( item.key );
    setContent( item.content );
  }, [item] );
  
  return (
    <div className={"bg-container-bg text-container-fg flex gap-4 p-2 rounded-xl"}>
      <div className={"flex flex-col gap-2"}>
        <IconButton
          icon={active ? YourDashIcon.ChevronUp : YourDashIcon.ChevronDown}
          onClick={() => setActive( !active )}
          className={"flex-shrink-0"}
        />
        {
          active && (
            <IconButton
              icon={YourDashIcon.Check}
              onClick={() => {
                if ( key === "" || content === "" ) {
                  return;
                }
                
                try {
                  JSON.parse( content );
                } catch ( _err ) {
                  return;
                }
                
                if ( key !== item.key ) {
                  removeKey( item.key );
                }
                
                setItemData( key, content );
              }}
              className={"flex-shrink-0"}
            />
          )
        }
      </div>
      {active
        ? (
          <TextInput
            onBlur={e => {
              setKey( e.currentTarget.value );
            }}
            onChange={( value: string ) => {
              setKey( value );
            }}
            defaultValue={key}
            className={"mt-auto mb-auto flex-shrink-0"}
          />
        )
        : <span className={"mt-auto mb-auto"}>{key}</span>
      }
      {
        active && (
          <TextBox
            className={"flex flex-shrink"}
            defaultValue={content}
            onChange={( e: any ) => {
              setContent( e.currentTarget.value );
            }}
          />
        )
      }
    </div>
  );
};

export default DbItem;
