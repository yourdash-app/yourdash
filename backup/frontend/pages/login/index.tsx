import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Chiplet from "~/frontend/chipletui"
import HomeLayout from "../../layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "../page"
import styles from "./index.module.scss"

const ServerLogin: NextPageWithLayout = () => {
  const [ url, setUrl ] = useState( "" )
  const [ message, setMessage ] = useState( "This is a message" )
  const [ allowed, setAllowed ] = useState( false )

  const router = useRouter()

  useEffect( () => {
    if (localStorage.getItem( "currentServer" ) && localStorage.getItem("currentServer") !== "") {
      router.push( "/login/server" )
    }
  }, [ router ] )

  useEffect( () => {
    setAllowed( false )

    if (url === "") {
      setAllowed( false )
      return setMessage( "Urls can't be empty" )
    }

    if (!(url.startsWith( "https://" ) || url.startsWith( "http://" ))) {
      setAllowed( false )
      setUrl( `https://${ url }` )
    }

    if (url.startsWith( "http://" ) && window.location.protocol !== "http:") {
      setAllowed( false )
      return setMessage( "Sorry, http:// urls are not supported by yourdash due to browser-imposed restrictions." )
    }

    setMessage( "" )
    if (url !== "http://localhost") {
      if (!url.includes( "." )) {
        setAllowed( false )
        return setMessage( "Invalid url" )
      }
      if (url.endsWith( "." )) {
        setAllowed( false )
        return setMessage( "Valid urls can't end with a '.'" )
      }
      if (url.endsWith( "/" )) {
        setAllowed( false )
        return setMessage( "Valid urls can't end with a '/'" )
      }
    }
    setMessage( "Checking if this url is valid..." )

    fetch( `${ url }:3560/test` ).then( res => {
      return res.text()
    } ).then( text => {
      if (text === "YourDash instance") {
        setAllowed( true )
        return setMessage( "" )
      } else {
        setAllowed( false )
        return setMessage( "This url is not a valid yourdash server" )
      }
    } ).catch( err => {
      setAllowed( false )
      if (err) return setMessage( "This url is not a valid yourdash server" )
      return setMessage( "This url did not respond" )
    } )
  }, [ url ] )

  return (
      <div className={ styles.root }>
        <Chiplet.Card>
          <Chiplet.Column>
            <h1 className={ styles.title }>Please enter the url of your server.</h1>
            <Chiplet.TextInput
                onChange={
                  e => {
                    setUrl( e.target.value )
                  }
                }
                onKeyDown={
                  e => {
                    if (!allowed) return

                    if (e.key === "Enter") {
                      localStorage.setItem( "currentServer", `${ url }:3560` )
                      router.push( "/login/server" )
                    }
                  }
                }
            />
            <span style={ { width: "100%", textAlign: "center" } }>{ message }</span>
            <Chiplet.Button
                disabled={ !allowed }
                onClick={
                  () => {
                    localStorage.setItem( "currentServer", `${ url }:3560` )
                    router.push( "/login/server" )
                  }
                }
            >Continue</Chiplet.Button>
          </Chiplet.Column>
        </Chiplet.Card>
        <Link href="/docs/" className={ styles.link }>
          Setup your own server.
        </Link>
      </div>
  )
}

export default ServerLogin

ServerLogin.getLayout = page => {
  return <HomeLayout>{ page }</HomeLayout>
}
