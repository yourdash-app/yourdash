/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import { type IEnv, type YourDashServerConfig } from ".";
import { RequestManager } from './libServer.js';

interface YourDashModule {
  name: string;
  load: (_request: RequestManager, _api: { SERVER_CONFIG: YourDashServerConfig } & IEnv) => void;
  unload: () => void;
  install: () => void;
}

export type { YourDashModule }
