/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/chiplet/components/button/Button";
import Card from "@yourdash/chiplet/components/card/Card";
import React, { useEffect, useState } from "react";
import coreCSI from "@yourdash/csi/coreCSI";
import DbItem from "./components/dbItem";

const GlobalDbApplication: React.FC = () => {
  const [keys, setKeys] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    coreCSI.syncGetJson("/app/global_db/db", (data) => {
      if (!data.db) {
        return;
      }

      setKeys(data.db);
    });
  }, []);

  return (
    <div className={"flex flex-col gap-2 relative min-h-full bg-bg"}>
      <div className={"flex flex-col w-full pb-20 h-full overflow-y-auto gap-2"}>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.keys(keys).map((key: any) => (
            <DbItem
              items={keys}
              setItems={(data: typeof keys) => {
                setKeys(data);
              }}
              setCurrentItemData={(k, item) => {
                setKeys({
                  ...keys,
                  [k]: JSON.parse(item),
                });
              }}
              key={key}
              currentItem={{
                key,
                content: JSON.stringify(keys[key], null, 2),
              }}
            />
          ))
        }
        <Button
          onClick={() => {
            setKeys({
              ...keys,
              [`untitled_${Math.floor(Math.random() * 1000)}`]: "",
            });
          }}
        >
          {"Create Database Key"}
        </Button>
      </div>
      <Card
        showBorder
        className={"w-full flex gap-2 absolute bottom-0 left-0"}
      >
        <Button
          onClick={() => {
            coreCSI.postJson("/app/global_db/db", keys, () => {
              /* empty */
            });
          }}
        >
          {"Save"}
        </Button>
        <Button
          onClick={() => {
            coreCSI.syncGetJson("/app/global_db/db", (data) => {
              if (!data.db) {
                return;
              }

              setKeys(data.db);
            });
          }}
        >
          {"Reload"}
        </Button>
        <Button
          onClick={() => {
            coreCSI.postJson("/app/global_db/db/force-write", keys, () => {
              /* empty */
            });
          }}
        >
          {"Force write"}
        </Button>
      </Card>
    </div>
  );
};

export default GlobalDbApplication;
