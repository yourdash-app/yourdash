import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Card from "../../components/containers/card/Card"
import ColContainer from "../../components/containers/ColContainer/ColContainer"
import Button from "../../components/elements/button/Button"
import ValidatedTextInput from "../../components/elements/validatedTextInput/ValidatedTextInput"
import HomeLayout from "../../components/layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "../page"
import styles from "./index.module.scss"

const ServerLogin: NextPageWithLayout = () => {
  const [ url, setUrl ] = useState("")
  const [ message, setMessage ] = useState("This is a message")
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("currentServer")) {
      router.push("/login/server")
    }
  }, [ router ])

  useEffect(() => {
    if (url === "") {
      return setMessage("Urls can't be empty")
    }

    if (!url.startsWith("https://") && window.location.port !== "3000") {
      return setMessage("Valid urls begin with 'https://'")
    }
    setMessage("")
    if (url !== "http://localhost") {
      if (!url.includes(".")) {
        return setMessage("Invalid url")
      }
      if (url.endsWith(".")) {
        return setMessage("Valid urls can't end with a '.'")
      }
      if (url.endsWith("/")) {
        return setMessage("Valid urls can't end with a '/'")
      }
    }
    setMessage("Checking if this url is valid...")

    fetch(`${url}:3560/test`)
      .then(res => res.text())
      .then(text => {
        if (text === "yourdash instance") {
          return setMessage("")
        } else {
          return setMessage("This url is not a valid yourdash server")
        }
      })
      .catch((err) => {
        if (err) return setMessage("This url is not a valid yourdash server")
        return setMessage("This url did not respond")
      })
  }, [ url ])

  return <div className={styles.root}>
    <Card>
      <ColContainer>
        <h1 className={styles.title}>Please enter the url of your server.</h1>
        <ValidatedTextInput invalidReason={message} onChange={(e) => { setUrl(e.target.value) }} />
        <Button disabled={!!message} onClick={() => {
          localStorage.setItem("currentServer", `${url}:3560`)
          router.push("/login/server")
        }}>Continue</Button>
      </ColContainer>
    </Card>
    <Link href="/docs/" className={styles.link}>
      Setup your own server.
    </Link>
  </div>
}

export default ServerLogin

ServerLogin.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}