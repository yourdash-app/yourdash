import React, {useEffect, useState} from "react";
import KeyValueDatabase from "../../../../../shared/core/database";
import csi from "../../../helpers/csi";

const GlobalDbApplication: React.FC = () => {
  const [keys, setKeys] = useState<any>({});

  useEffect(() => {
    csi.getJson("/app/global_db/db", data => {
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
          Object.keys(keys).map((key: any, ind: number) => (
            <div key={key}>
              <span>
                {key}
              </span>
              <div>
                {
                  keys[ind]
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default GlobalDbApplication;
