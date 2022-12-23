import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../../components/containers/card/Card";
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import RowContainer from "../../../components/containers/RowContainer/RowContainer";
import Button from "../../../components/elements/button/Button";
import ButtonLink from "../../../components/elements/buttonLink/ButtonLink";
import TextInput from "../../../components/elements/textInput/TextInput";
import HomeLayout from "../../../components/layouts/homeLayout/HomeLayout";
import SERVER, { verifyAndReturnJson } from "../../../lib/server";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";
import { YourDashIconRawDictionary } from "../../../components/elements/icon/iconDictionary";

const LoginOptions: NextPageWithLayout = () => {
  const [ userName, setUserName ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorHasOccurred, setErrorHasOccurred ] = useState(false)
  const [ currentServerBackground, setCurrentServerBackground ] = useState("")
  const [ currentServerLogo, setCurrentServerLogo ] = useState("")

  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get(`/core/instance/login/background`),
      (json) => {
        setCurrentServerBackground(json?.image?.src || YourDashIconRawDictionary[ "server-error" ])
      },
      () => {
        setCurrentServerBackground(YourDashIconRawDictionary[ "server-error" ])
      })
    verifyAndReturnJson(
      SERVER.get(`/core/instance/login/logo`),
      (json) => {
        setCurrentServerLogo(json?.image?.src || YourDashIconRawDictionary[ "server-error" ])
      },
      () => {
        setCurrentServerLogo(YourDashIconRawDictionary[ "server-error" ])
      })
  }, [])

  const router = useRouter()

  return (
    <>
      {errorHasOccurred ? <div className={styles.error}><p>An Error Has Occured</p></div> : null}
      <div className={styles.root}>
        <img className={styles.background} src={currentServerBackground} alt="" />
        <img style={{
          marginBottom: "0.5rem"
        }} src={currentServerLogo} alt="" />
        <Card>
          <ColContainer>
            <TextInput placeholder="Username" onChange={(e) => {
              setUserName(e.currentTarget.value);
              setErrorHasOccurred(false)
            }} />
            <TextInput placeholder="Password" type="password" onChange={(e) => {
              setPassword(e.currentTarget.value);
              setErrorHasOccurred(false)
            }} />
            <RowContainer style={{
              width: "100%"
            }}>
              <Button style={{
                flexGrow: 1
              }} onClick={() => {
                localStorage.setItem("username", userName)
                SERVER.get("/userManagement/login", {
                  password: password
                }).then((res) => {
                  res.json().then((res) => {
                    if (!res?.error) {
                      localStorage.setItem("sessiontoken", res.sessionToken)
                      return router.push("/app/dash")
                    }
                    setErrorHasOccurred(true)
                  }).catch(() => {
                    setErrorHasOccurred(true)
                    throw new Error("Login Error, the server responded with an invalid response.")
                  })
                }).catch((err) => {
                  if (err) {
                    console.error("ERROR CAUGHT: /user/login: " + err)
                    setErrorHasOccurred(true)
                  }
                })
              }} vibrant>
                Login
              </Button>
              <ButtonLink style={{
                flexGrow: 1
              }} href="/login/server/signup">
                Sign up
              </ButtonLink>
            </RowContainer>
          </ColContainer>
        </Card>
        <Card style={{
          marginTop: "0.5rem"
        }}>
          <p style={{
            margin: 0,
          }}>This is a test message</p>
        </Card>
      </div>
    </>
  );
};

export default LoginOptions;

LoginOptions.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}
