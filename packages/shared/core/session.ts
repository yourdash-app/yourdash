export interface IYourDashSession<T extends YOURDASH_SESSION_TYPE> {
  id: number,
  type: T,
  sessionToken: string
}

export enum YOURDASH_SESSION_TYPE {
  web,
  desktop,
  cli,
  external
}
