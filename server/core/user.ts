export interface IYourDashUser {
  username: string,
  fullName: { first: string, middle: string, last: string }
}

export default class YourDashUser {
  username: string;
  user: IYourDashUser
  
  constructor(username: string) {
    this.username = username
    this.read()
    return this
  }
  
  getPath(): string {
    // TODO: return the user's home dir path ( not user's fs )
    return "USER_PATH"
  }
  
  write() {
    // TODO: write the user to disk
    
    return
  }
  
  read() {
    // TODO: read the user from disk
    
    return
  }
  
  
}
