import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonLink from "ui/backup/elements/buttonLink/ButtonLink";
import TextInput from "ui/backup/elements/textInput/TextInput";
import HomeLayout from "../../../layouts/homeLayout/HomeLayout";
import SERVER, { verifyAndReturnJson } from "../../../server";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";
import RightClickMenuRootContainer from "ui/backup/elements/rightClickMenu/RightClickMenuRootContainer";
import Chiplet from "ui"
// eslint-disable-next-line import/named
import { ChipletIconDictionary } from "ui/icon/iconDictionary.ts";

const LoginOptions: NextPageWithLayout = () => {
  const [ userName, setUserName ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorHasOccurred, setErrorHasOccurred ] = useState(false)
  const [ currentServerBackground, setCurrentServerBackground ] = useState("")
  const [ currentServerLogo, setCurrentServerLogo ] = useState("")
  const [ currentServerMessage, setCurrentServerMessage ] = useState("")
  const [ serverDisplayName, setServerDisplayName ] = useState("")

  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(`/core/instance/login/background`),
        json => {
          setCurrentServerBackground(json?.image?.src || ChipletIconDictionary["server-error"])
        },
        () => {
          setCurrentServerBackground(ChipletIconDictionary["server-error"])
        })
    verifyAndReturnJson(
        SERVER.get(`/core/instance/login/name`),
        json => {
          setServerDisplayName(json?.name || "ERROR")
        },
        () => {
          setServerDisplayName("ERROR")
        })
    verifyAndReturnJson(
        SERVER.get(`/core/instance/login/logo`),
        json => {
          setCurrentServerLogo(json?.image?.src || ChipletIconDictionary["server-error"])
        },
        () => {
          setCurrentServerLogo(ChipletIconDictionary["server-error"])
        })
    verifyAndReturnJson(
        SERVER.get(`/core/instance/login/message`),
        json => {
          setCurrentServerMessage(json?.text || "")
        },
        () => {
          console.error("Error reading login message")
        })
  }, [])

  const router = useRouter()

  return (
    <div className={ styles.root }>
      {errorHasOccurred ? <div className={ styles.error }><p>An Error Has Occurred</p></div> : null}
      <img className={ styles.background } src={ currentServerBackground } alt=""/>
      <img className={ styles.logo } src={ currentServerLogo } alt=""/>
      <h1>{serverDisplayName}</h1>
      <Chiplet.Card style={ { maxWidth: "calc(100vw - 5rem)", minWidth: "50%" } }>
        <Chiplet.Column>
          <TextInput
            placeholder="Username"
            onChange={ e => {
                  setUserName(e.currentTarget.value);
                  setErrorHasOccurred(false)
                } }
          />
          <TextInput
            placeholder="Password"
            type="password"
            onChange={ e => {
                  setPassword(e.currentTarget.value);
                  setErrorHasOccurred(false)
                } }
          />
          <Chiplet.Row style={ { width: "100%" } }>
            <Chiplet.Button
              style={ { flexGrow: 1 } }
              onClick={ () => {
                    localStorage.setItem("username", userName)
                    SERVER.get("/userManagement/login", {
                      password,
                      username: userName
                    }).then(res => {
                      res.json().then(res => {
                        if (!res?.error) {
                          localStorage.setItem("sessiontoken", res.sessionToken)
                          return router.push("/app/dash")
                        }
                        setErrorHasOccurred(true)
                      }).catch(() => {
                        setErrorHasOccurred(true)
                        throw new Error("Login Error, the server responded with an invalid response.")
                      })
                    }).catch(err => {
                      if (err) {
                        console.error(`ERROR CAUGHT: /user/login: ${err}`)
                        return setErrorHasOccurred(true)
                      }
                    })
                  } }
              vibrant
            >
              Login
            </Chiplet.Button>
            <ButtonLink style={ { flexGrow: 1 } } href="/login/server/signup">
              Sign up
            </ButtonLink>
          </Chiplet.Row>
        </Chiplet.Column>
      </Chiplet.Card>
      {
          currentServerMessage !== "" ? (
            <Chiplet.Card style={ { marginTop: "0.5rem" } }>
              <p style={ { margin: 0 } }>{currentServerMessage}</p>
            </Chiplet.Card>
              )
              : null
        }
      <Chiplet.DropdownButton
        className={ styles.switchInstance }
        items={ [
              {
                name: "test1",
                onClick: () => {
                  router.push(`/login/server/test1`)
                }
              }
            ] }
      >Switch instance</Chiplet.DropdownButton>
    </div>
  );
};

export default LoginOptions;

LoginOptions.getLayout = page => {
  return (
    <RightClickMenuRootContainer>
      <HomeLayout>{page}</HomeLayout>
    </RightClickMenuRootContainer>
  )
}
