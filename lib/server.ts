let defaultHeaders = {
  userToken: "",
  userName: ""
}

const Server = {
  get: (path: string) => {
    return fetch(`${localStorage.getItem("currentServer")}/api${path}`, {headers: {...defaultHeaders}, method: "GET"})
  },
  post: (path: string) => {
    return fetch(`${localStorage.getItem("currentServer")}/api${path}`, {headers: {...defaultHeaders}, method: "POST"})
  },
  delete: (path: string) => {
    return fetch(`${localStorage.getItem("currentServer")}/api${path}`, {headers: {...defaultHeaders}, method: "DELETE"})
  }
}

export default Server
