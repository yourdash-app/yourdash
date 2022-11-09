import React, { useEffect, useState } from "react"
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import CardButton from "../../../components/elements/cardButton/CardButton";
import Card from "../../../components/elements/card/Card";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss"
import { useRouter } from "next/router";
import HomeLayout from "../../../components/layouts/homeLayout/HomeLayout";
import TextInput from "../../../components/elements/textInput/TextInput";
import Button from "../../../components/elements/button/Button";
import SERVER from "../../../lib/server";

const LoginOptions: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem("token")) {
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
          <TextInput placeholder="Username" onChange={(e) => { setUserName(e.currentTarget.value)}} />
          <TextInput placeholder="Password" type="password" onChange={(e) => { setPassword(e.currentTarget.value)}} />
          <Button onClick={() => { 
            SERVER.get("/user/login")
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