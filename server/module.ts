import { YourDashServerConfig } from './index';
import Express from 'express';

export default interface YourDashModule {
  name: string;
  id: string;
  load: (_app: Express.Application, _api: { SERVER_CONFIG: YourDashServerConfig }) => void;
  unload: () => void;
  install: () => void;
}
