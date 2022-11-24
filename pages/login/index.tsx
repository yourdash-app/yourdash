import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ColContainer from "../../components/containers/ColContainer/ColContainer"
import Button from "../../components/elements/button/Button"
import Card from "../../components/elements/card/Card"
import TextInput from "../../components/elements/validatedTextInput/ValidatedTextInput"
import HomeLayout from "../../components/layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "../page"
import styles from "./index.module.css"

const ServerLogin: NextPageWithLayout = () => {
  const [ url, setUrl ] = useState("")
  const [ urlIsValid, setUrlIsValid ] = useState(false)
  const [ message, setMessage ] = useState("This is a message")
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("currentServer")) {
      router.push("/login/server")
    }
  }, [ router ])

  useEffect(() => {
    if (url === "") {
      setMessage("")
      return setUrlIsValid(false)
    }

    if (!url.startsWith("https://") && window.location.port !== "3000") {
      setMessage("Valid urls begin with 'https://'")
      return setUrlIsValid(false)
    }
    setMessage("")
    if (url !== "http://localhost") {
      if (!url.includes(".")) {
        setMessage("Invalid url")
        return setUrlIsValid(false)
      }
      if (url.endsWith(".")) {
        setMessage("Valid urls can't end with a '.'")
        return setUrlIsValid(false)
      }
      if (url.endsWith("/")) {
        setMessage("Valid urls can't end with a '/'")
        return setUrlIsValid(false)
      }
    }
    setMessage("Checking if this url is valid...")

    fetch(`${url}:3560/test`)
      .then(res => res.text())
      .then(text => {
        if (text === "yourdash instance") {
          setMessage("This url is a valid yourdash server 🥳")
          return setUrlIsValid(true)
        } else {
          setMessage("This url is not a valid yourdash server")
          return setUrlIsValid(false)
        }
      })
      .catch((err) => {
        if (urlIsValid) return
        setMessage("This url did not respond")
        return setUrlIsValid(false)
      })
  }, [ url ])

  return <div className={styles.root}>
    <Card>
      <ColContainer>
        <h1 className={styles.title}>Please enter the url of your server.</h1>
        <TextInput onBlur={() => { setMessage("") }} invalidReason={message} isValid={urlIsValid} onChange={(e) => { setUrl(e.target.value) }} />
        <Button disabled={!urlIsValid} onClick={() => {
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