/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyValueDatabase from './keyValueDatabase.js';

const globalDatabase: KeyValueDatabase = new KeyValueDatabase();

export default globalDatabase;
