/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import csi from "web-client/src/helpers/csi";
import DbItem from "./components/dbItem";
import { Button } from "web-client/src/ui";

const GlobalDbApplication: React.FC = () => {
  const [keys, setKeys] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [ key: string ]: any
  }>( {} );
  
  useEffect( () => {
    csi.getJson( "/app/global_db/db", data => {
      if ( !data.db ) {
        return;
      }
      
      setKeys( data.db );
    } );
  }, [] );
  
  return (
    <div className={"flex flex-col gap-2 relative min-h-full pt-2 bg-bg"}>
      <div className={"flex flex-col w-full pl-2 pr-2 pb-20 h-full overflow-y-auto gap-2"}>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.keys( keys ).map( ( key: any ) => (
            <DbItem
              removeKey={( k: string ) => {
                setKeys( {
                  ...Object.keys( keys ).filter( ( itemKey: string ) => itemKey !== k )
                } );
              }}
              setItemData={( k, item ) => {
                setKeys( {
                  ...keys,
                  [k]: JSON.parse( item )
                } );
              }}
              key={key}
              item={{
                key,
                content: JSON.stringify( keys[key], null, 2 )
              }}
            />
          ) )
        }
        <Button onClick={() => {
          setKeys( {
            ...keys,
            // eslint-disable-next-line no-magic-numbers
            [`untitled_${ Math.floor( Math.random() * 1000 ) }`]: {}
          } );
        }}
        >{"Create Database Key"}</Button>
      </div>
      <footer className={"w-full flex bg-container-bg border-t-[1px] border-t-container-border p-2 gap-2 absolute bottom-0 left-0"}>
        <Button onClick={() => {
          csi.postJson( "/app/global_db/db", keys, () => {
            /* empty */
          } );
        }}
        >
          {"Save"}
        </Button>
        <Button onClick={() => {
          csi.getJson( "/app/global_db/db", data => {
            if ( !data.db ) {
              return;
            }
            
            setKeys( data.db );
          } );
        }}
        >
          {"Reload"}
        </Button>
        <Button onClick={() => {
          csi.postJson( "/app/global_db/db/force-write", keys, () => {
            /* empty */
          } );
        }}
        >
          {"Force write"}
        </Button>
      </footer>
    </div>
  );
};

export default GlobalDbApplication;
