import React, { useEffect, useState } from "react";
import { TextBox, IconButton, TextInput } from "../../../../ui";

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
    <div className={"bg-container-secondary-bg text-container-secondary-fg flex gap-4 p-2 rounded-xl"}>
      <div className={"flex flex-col gap-2"}>
        <IconButton
          icon={active ? "chevron-up-16" : "chevron-down-16"}
          onClick={() => setActive( !active )}
          className={"flex-shrink-0"}
        />
        {
          active && (
            <IconButton
              icon={"check-16"}
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
            onChange={e => {
              setContent( e.currentTarget.value );
            }}
          />
        )
      }
    </div>
  );
};

export default DbItem;
