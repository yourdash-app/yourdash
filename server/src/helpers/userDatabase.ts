import KeyValueDatabase from '../../../shared/core/database.js';

const userDatabases: { [ username: string ]: KeyValueDatabase } = {};

export default function getUserDatabase(username: string) {
  if (userDatabases[username]) {
    return userDatabases[username];
  }

  userDatabases[username] = new KeyValueDatabase();
  return userDatabases[username];
}
