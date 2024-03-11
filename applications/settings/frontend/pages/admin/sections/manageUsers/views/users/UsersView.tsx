/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import User from "./components/User";

const UsersView: React.FC = () => {
  const [users, setUsers] = React.useState<{username: string, avatar: string, name: { first: string, last: string }}[]>( [] )
  
  React.useEffect( () => {
    setUsers( [
      {
        avatar: "",
        name: { first: "John", last: "Doe" },
        username: "johnd"
      },
      {
        avatar: "",
        name: { first: "Jane", last: "Doe" },
        username: "janed"
      }
    ] )
  } )
  
  return (
    <>
      {
        users.map( u => {
          return <User
            username={u.username}
            avatar={u.avatar}
            key={u.username}
            name={u.name}
          />
        } )
      }
    </>
  )
}

export default UsersView
