/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import { IEnv, YourDashServerConfig } from './index.js';
import { RequestManager } from './libServer.js';

export default interface YourDashModule {
  name: string;
  load: (_request: RequestManager, _api: { SERVER_CONFIG: YourDashServerConfig } & IEnv) => void;
  unload: () => void;
  install: () => void;
}
