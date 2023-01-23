import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "ui/containers/card/Card";
import ColContainer from "ui/containers/ColContainer/ColContainer";
import RowContainer from "ui/containers/RowContainer/RowContainer";
import Button from "ui/elements/button/Button";
import ButtonLink from "ui/elements/buttonLink/ButtonLink";
import TextInput from "ui/elements/textInput/TextInput";
import HomeLayout from "../../../layouts/homeLayout/HomeLayout";
import SERVER, { verifyAndReturnJson } from "../../../server";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";
import { YourDashIconRawDictionary } from "ui/elements/icon/iconDictionary";
import DropdownButton from "ui/elements/dropdownButton/DropdownButton";
import RightClickMenuRootContainer from "ui/elements/rightClickMenu/RightClickMenuRootContainer";

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
          setCurrentServerBackground(json?.image?.src || YourDashIconRawDictionary["server-error"])
        },
        () => {
          setCurrentServerBackground(YourDashIconRawDictionary["server-error"])
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
          setCurrentServerLogo(json?.image?.src || YourDashIconRawDictionary["server-error"])
        },
        () => {
          setCurrentServerLogo(YourDashIconRawDictionary["server-error"])
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
    <div className={styles.root}>
      {errorHasOccurred ? <div className={styles.error}><p>An Error Has Occurred</p></div> : null}
      <img className={styles.background} src={currentServerBackground} alt=""/>
      <img className={styles.logo} src={currentServerLogo} alt=""/>
      <h1>{serverDisplayName}</h1>
      <Card className={styles.content}>
        <ColContainer>
          <TextInput
            placeholder="Username"
            onChange={e => {
                  setUserName(e.currentTarget.value);
                  setErrorHasOccurred(false)
                }}
          />
          <TextInput
            placeholder="Password"
            type="password"
            onChange={e => {
                  setPassword(e.currentTarget.value);
                  setErrorHasOccurred(false)
                }}
          />
          <RowContainer style={{ width: "100%" }}>
            <Button
              style={{ flexGrow: 1 }}
              onClick={() => {
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
                  }}
              vibrant
            >
              Login
            </Button>
            <ButtonLink style={{ flexGrow: 1 }} href="/login/server/signup">
              Sign up
            </ButtonLink>
          </RowContainer>
        </ColContainer>
      </Card>
      {
          currentServerMessage !== "" ? (
            <Card style={{ marginTop: "0.5rem" }}>
              <p style={{ margin: 0, }}>{currentServerMessage}</p>
            </Card>
              )
              : null
        }
      <DropdownButton
        className={styles.switchInstance}
        items={[
              {
                name: "test1",
                onClick: () => {
                  router.push(`/login/server/test1`)
                }
              }
            ]}
      >Switch instance</DropdownButton>
    </div>
  );
};

export default LoginOptions;

LoginOptions.getLayout = page => (
  <RightClickMenuRootContainer>
    <HomeLayout>{page}</HomeLayout>
  </RightClickMenuRootContainer>
)
