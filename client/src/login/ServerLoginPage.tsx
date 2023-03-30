import React, { useState } from "react";
import { Button, Card, TextInput } from "../ui/index";

const ServerLoginPage: React.FC = () => {
  const [ selectedUser, setSelectedUser ] = useState<null | string>( null );
  
  if (selectedUser) return <LoginAsUser username={ selectedUser }/>;
  
  return <SelectUser setSelectedUser={ (username) => setSelectedUser( username ) }/>;
};

export default ServerLoginPage;

const SelectUser: React.FC<{ setSelectedUser: (username: string) => void }> = ({ setSelectedUser }) => {
  const [ username, setUsername ] = useState<null | string>( null );
  
  return <>
    <Card>
      <TextInput mustMatchRegex={ /[a-z]|[0-9]/ } onChange={ (value) => setUsername( value ) }/>
      <Button disabled={ username === null } onClick={ () => {
        if (username === null) return;
        
        setSelectedUser( username );
      } }>Continue</Button>
    </Card>
  </>;
};

const LoginAsUser: React.FC<{ username: string }> = ({ username }) => {
  return <>
    <Card>
      <img alt={ `` } src={ `` }/>
      <span>{ username }</span>
      <TextInput onChange={ () => {} }/>
    </Card>
  </>;
};
