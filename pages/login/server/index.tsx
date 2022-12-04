import { useRouter } from "next/router";
import { useState } from "react";
import Card from "../../../components/containers/card/Card";
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import Button from "../../../components/elements/button/Button";
import TextInput from "../../../components/elements/textInput/TextInput";
import HomeLayout from "../../../components/layouts/homeLayout/HomeLayout";
import SERVER from "../../../lib/server";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";

const LoginOptions: NextPageWithLayout = () => {
  const [ userName, setUserName ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorHasOccured, setErrorHasOccured ] = useState(false)

  const router = useRouter()

  return (
    <>
      {errorHasOccured ? <div className={styles.error}><p>An Error Has Occured</p></div> : null}
      <div className={styles.root}>
        <Card>
          <ColContainer>
            <TextInput placeholder="Username" onChange={(e) => {
              setUserName(e.currentTarget.value);
              setErrorHasOccured(false)
            }} />
            <TextInput placeholder="Password" type="password" onChange={(e) => {
              setPassword(e.currentTarget.value);
              setErrorHasOccured(false)
            }} />
            <Button onClick={() => {
              localStorage.setItem("username", userName)
              SERVER.get("/user/login", {
                password: password
              }).then(res => {
                res.json().then(res => {
                  if (!res?.error) {
                    localStorage.setItem("sessiontoken", res.sessionToken)
                    return router.push("/app/dash")
                  }
                  setErrorHasOccured(true)
                }).catch(() => {
                  setErrorHasOccured(true)
                  throw new Error("Login Error, the server responded with an invalid response.")
                })
              }).catch(err => {
                if (err) {
                  console.error("ERROR CAUGHT: /user/login: " + err)
                  setErrorHasOccured(true)
                }
              })
            }} vibrant>
              Login
            </Button>
          </ColContainer>
        </Card>
      </div>
    </>
  );
};

export default LoginOptions;

LoginOptions.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}
