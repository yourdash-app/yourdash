import { NextPageWithLayout } from '~/pages/page';
// @ts-ignore
import { ChipletIconDictionary } from '~/chipletui/components/icon/iconDictionary.ts';
import RightClickMenuRootContainer from '~/chipletui/components/rightClickMenu/RightClickMenuRootContainer';
import { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "~/server";
import styles from "./index.module.scss"
import Chiplet from '~/chipletui';
import { useRouter } from "next/router";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter()

  const [ instanceName, setInstanceName ] = useState( "YourDash Instance" )
  const [ serverUrl, setServerUrl ] = useState( "https://example.com" )

  const [ username, setUsername ] = useState( "" )
  const [ password, setPassword ] = useState( "" )

  useEffect( () => {
    setServerUrl( localStorage.getItem( "currentServer" ) || "https://example.com" )

    SERVER.get( `/instance/login/name` ).then( res => res.text() ).then( res => setInstanceName( res ) )
  }, [] )

  return <div className={ styles.root }>
    <section className={ styles.sidebar }>
      <Chiplet.IconButton
          icon={ "chevron-left-16" }
          className={ styles.backButton }
          onClick={ () => {router.push( `/` )} }
      />
      <img src={ `${ serverUrl }/api/instance/login/logo` } alt={ `` }/>
      <h1>{ instanceName }</h1>
      <span>Username</span>
      <Chiplet.TextInput onChange={ (e) => setUsername( e.currentTarget.value ) } type={ "text" }/>
      <span>Password</span>
      <Chiplet.TextInput onChange={ (e) => setPassword( e.currentTarget.value ) } type={ "password" }/>
      <Chiplet.Button className={ styles.loginButton } onClick={ () => {
        verifyAndReturnJson(
            SERVER.post( `/instance/login/login`, {
              body: JSON.stringify(
                  {
                    username: username,
                    password: password
                  }
              )
            } ),
            (data) => { sessionStorage.setItem( "sessionToken", data.token ) },
            () => {console.error( `unable to create a new session token` )}
        )
      } }>
        <Chiplet.Icon name={ "login" } color={ `var(--button-fg)` }/>
        <span>Login</span>
      </Chiplet.Button>
    </section>
    <img className={ styles.background } src={ `${ serverUrl }/api/instance/login/background` } alt={ `` }/>
  </div>
};

export default LoginPage;

LoginPage.getLayout = page => (
    <RightClickMenuRootContainer>
      { page }
    </RightClickMenuRootContainer>
);
