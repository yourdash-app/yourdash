/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import csi from "web-client/src/helpers/csi";
import DbItem from "./components/dbItem";
import { Button, Card } from "web-client/src/ui";

const GlobalDbApplication: React.FC = () => {
  const [ keys, setKeys ] = useState<{ [ key: string ]: string }>( {} );

  useEffect( () => {
    csi.getJson( "/app/global_db/db", data => {
      if ( !data.db ) {
        return;
      }

      setKeys( data.db );
    } );
  }, [] );

  return (
    <div className={"flex flex-col gap-2 relative min-h-full bg-bg"}>
      <div className={"flex flex-col w-full pb-20 h-full overflow-y-auto gap-2"}>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.keys( keys ).map( ( key: any ) => (
            <DbItem
              items={keys}
              setItems={( data: typeof keys ) => {
                setKeys( data );
              }}
              setCurrentItemData={( k, item ) => {
                setKeys( {
                  ...keys,
                  [k]: JSON.parse( item )
                } );
              }}
              key={key}
              currentItem={{
                key,
                content: JSON.stringify( keys[key], null, 2 )
              }}
            />
          ) )
        }
        <Button onClick={() => {
          setKeys( {
            ...keys,
            [`untitled_${ Math.floor( Math.random() * 1000 ) }`]: ""
          } );
        }}
        >{"Create Database Key"}</Button>
      </div>
      <Card showBorder className={"w-full flex gap-2 absolute bottom-0 left-0"}>
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
      </Card>
    </div>
  );
};

export default GlobalDbApplication;
