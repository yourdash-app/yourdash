/*
 *   Copyright (c) 2022-2023 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import { type IEnv, type YourDashServerConfig } from ".";
import { RequestManager } from './libServer.js';

interface YourDashModule {
  load: (_request: RequestManager, _api: { SERVER_CONFIG: YourDashServerConfig } & IEnv) => void;
  unload: () => void;
  install: () => void;
  uninstall: () => void;
  requiredModules: string[];
  configuration?: { user?: (string | boolean)[]; global?: (string | boolean)[] }
}

export type { YourDashModule }
