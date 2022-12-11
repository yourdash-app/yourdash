import { YourDashServerConfig, ENV, TENV } from './index.js';
import Express from 'express';

export default interface YourDashModule {
  name: string;
  id: string;
  load: (_app: Express.Application, _api: { SERVER_CONFIG: YourDashServerConfig } & TENV) => void;
  unload: () => void;
  install: () => void;
}
