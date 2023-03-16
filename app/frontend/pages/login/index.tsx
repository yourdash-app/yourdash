import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Chiplet from "~/chipletui"
import HomeLayout from "../../layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "../page"
import styles from "./index.module.scss"

const ServerLogin: NextPageWithLayout = () => {
  const [ url, setUrl ] = useState("")
  const [ allowed, setAllowed ] = useState(false)

  // checks
  const [usesHttps, setUsesHttps] = useState(false)
  const [validUrl, setValidUrl] = useState(0)
  const [notEndWithSlash, setNotEndWithSlash] = useState(false)
  const [notEndWithPeriod, setNotEndWithPeriod] = useState(false)
  const [notEmpty, setNotEmpty] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("currentServer")) {
      router.push("/login/server")
    }
  }, [ router ])

  useEffect(() => {
    setAllowed(false)

    setUsesHttps(false)
    setValidUrl(0)
    setNotEndWithSlash(false)
    setNotEndWithPeriod(false)
    setNotEmpty(false)

    if (url === "") {
      setAllowed(false)
      setNotEmpty(false)
      return
    }

    if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      setAllowed(false)
      setUrl(`https://${url}`)
      return setUsesHttps(false)
    }

    if (url.startsWith("http://") && window.location.protocol !== "http:") {
      setAllowed(false)
      return setUsesHttps(false)
    }

    if (url !== "http://localhost") {
      if (!url.includes(".")) {
        setAllowed(false)
        return setValidUrl(0)
      }
      if (url.endsWith(".")) {
        setAllowed(false)
        return setNotEndWithPeriod(true)
      }
      if (url.endsWith("/")) {
        setAllowed(false)
        return setNotEndWithSlash(true)
      }
    }

    setValidUrl(1)

    fetch(`${url}:3560/test`)
        .then(res => {
          return res.text()
        })
        .then(text => {
          if (text === "YourDash instance") {
            setAllowed(true)
            setValidUrl(2)
            return
          } else {
            setAllowed(false)
            setValidUrl(0)
            return
          }
        })
        .catch(() => {
          setAllowed(false)
        })
  }, [ url ])

  return (
    <div className={ styles.root }>
        <Chiplet.Column>
          <h1 className={ styles.title }>Please enter the url of your server.</h1>
          <Chiplet.TextInput
            onChange={
                  e => {
                    setUrl(e.target.value)
                  }
                }
            onKeyDown={
                  e => {
                    if (!allowed) return

                    if (e.key === "Enter") {
                      localStorage.setItem("currentServer", `${url}:3560`)
                      router.push("/login/server")
                    }
                  }
                }
          />
          <section className={styles.checks}>
            <Chiplet.Card compact={true}>
              <Chiplet.Icon name={"link-16"} color={"var(--card-fg)"} />
              <span>Isn&apos;t empty</span>
            </Chiplet.Card>
          </section>
          <Chiplet.Button
            disabled={ !allowed }
            onClick={
                  () => {
                    localStorage.setItem("currentServer", `${url}:3560`)
                    router.push("/login/server")
                  }
                }
          >Continue</Chiplet.Button>
        </Chiplet.Column>
      <Link href="/docs/" className={ styles.link }>
        Setup your own server.
      </Link>
    </div>
  )
}

export default ServerLogin

ServerLogin.getLayout = page => {
  return <HomeLayout>{page}</HomeLayout>
}
