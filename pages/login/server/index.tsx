import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../../components/containers/card/Card";
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import Button from "../../../components/elements/button/Button";
import TextInput from "../../../components/elements/textInput/TextInput";
import HomeLayout from "../../../components/layouts/homeLayout/HomeLayout";
import SERVER from "../../../lib/server";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";

const LoginOptions: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem("currentServer")) router.push("/login")
    if (localStorage.getItem("sessiontoken")) {
      SERVER.get("/get/current/user")
        .then(res => {
          res.json()
            .then(() => {
              router.push("/app/dash")
            })
            .catch(err => {
              console.error(err)
              localStorage.removeItem("sessionToken")
            })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [ router ])

  const [ userName, setUserName ] = useState("")
  const [ password, setPassword ] = useState("")

  return (
    <div className={styles.root}>
      <Card>
        <ColContainer>
          <TextInput placeholder="Username" onChange={(e) => { setUserName(e.currentTarget.value) }} />
          <TextInput placeholder="Password" type="password" onChange={(e) => { setPassword(e.currentTarget.value) }} />
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
              }).catch(() => {
                throw new Error("Login Error, the server responded with an invalid response.")
              })
            }).catch(err => { if (err) console.error("ERROR CAUGHT: /user/login: " + err) })
          }} vibrant>
            Login
          </Button>
        </ColContainer>
      </Card>
    </div>
  );
};

export default LoginOptions;

LoginOptions.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}
