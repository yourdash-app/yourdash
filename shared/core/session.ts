export interface YourDashSession {
  id: number,
  type: YourDashSessionType,
  sessionToken: string
}

export enum YourDashSessionType {
  web,
  desktop,
  cli,
  external
}
