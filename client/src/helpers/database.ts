import KeyValueDatabase from "../../../shared/core/database";

import csi from "./csi";

const db = new KeyValueDatabase();

export function loadDatabaseFromServer() {
  csi.getJson("/core/userdb", data => {
    db.clear();
    Object.keys(data).forEach(key => {
      db.set(key, data[key]);
    });
  });
}

export default db;
