export interface IYourDashSession<T extends YourDashSessionType> {
  id: number,
  type: T,
  sessionToken: string
  ip: string
}

export enum YourDashSessionType {
  web,
  desktop,
  cli,
  external
}
