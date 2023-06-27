import React, {useEffect, useState} from "react";
import KeyValueDatabase from "../../../../../shared/core/database";
import csi from "../../../helpers/csi";

const GlobalDbApplication: React.FC = () => {
  const [kvd, setKvd] = useState<KeyValueDatabase | undefined>(undefined);
  // @ts-ignore
  const [keys, setKeys] = useState<any>({});

  useEffect(() => {
    setKvd(new KeyValueDatabase());

    csi.getJson("/app/global_db/get", data => {
      if (!data.db) {
        return;
      }

      setKeys(data.db);
    });
  }, []);

  return (
    <div>
      <span>{"GlobalDbApplication"}</span>
      <div>
        {
          Object.keys(keys).map((key: any) => (
            <span key={key}>{key}</span>
          ))
        }
      </div>
    </div>
  );
};

export default GlobalDbApplication;
