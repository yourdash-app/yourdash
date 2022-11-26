import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import Button from "../../../components/elements/button/Button";
import Card from "../../../components/elements/card/Card";
import TextInput from "../../../components/elements/textInput/TextInput";
import HomeLayout from "../../../components/layouts/homeLayout/HomeLayout";
import SERVER from "../../../lib/server";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";

const LoginOptions: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem("sessiontoken")) {
      router.push("/app")
      return
    }
  })

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
            SERVER.get("/user/login", { password: password }).then(res => res.text()).then(res => {
              if (res !== "Forbidden") {
                localStorage.setItem("sessiontoken", res)
                router.push("/app/dash")
              }
            }).catch(err => { if (err) console.error(err) })
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