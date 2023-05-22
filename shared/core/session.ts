export interface IYourDashSession<T extends YourDashSessionType> {
  id: number,
  type: T,
  sessionToken: string
}

export enum YourDashSessionType {
  web,
  desktop,
  cli,
  external
}
