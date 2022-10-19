/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import ColContainer from "../../../components/containers/ColContainer/ColContainer"
import Card from "../../../components/elements/card/Card"
import TextInput from "../../../components/elements/textInput/TextInput"
import HomeLayout from "../../../components/layouts/homeLayout/HomeLayout"
import { NextPageWithLayout } from "../../page"
import styles from "./index.module.css"

const ServerLogin: NextPageWithLayout = () => {
  const [ url, setUrl ] = useState("")
  const [ urlIsValid, setUrlIsValid ] = useState(false)
  const [ message, setMessage ] = useState("This is a message")
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("currentServer")) {
      router.push("/login/options")
    }
  })

  useEffect(() => {
    if (url === "") {
      setMessage("")
      return setUrlIsValid(false) 
    }

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      setMessage("Valid urls begin with 'https://' or 'http://'")
      return setUrlIsValid(false)
    }
    setMessage("")
    if (url.startsWith("https://.") || url.startsWith("http://.")) {
      setMessage("Invalid url")
      return setUrlIsValid(false)
    }
    if (!url.includes(".")) {
      setMessage("Invalid url")
      return setUrlIsValid(false)
    }
    if (url.endsWith(".")) {
      setMessage("Valid urls can't end with a '.'")
      return setUrlIsValid(false)
    }
    setMessage("Checking if this url is valid...")

    fetch(url + "/test")
      .then(res => res.text())
      .then(text => {
        if (text === "yourdash instance") {
          setMessage("This url is a valid yourdash server 🥳")
          setUrlIsValid(true)
        } else {
          setMessage("This url is not a valid yourdash server")
          return setUrlIsValid(false)
        }
      })
      .catch(() => {
        setMessage("This url did not respond")
        return setUrlIsValid(false)
      })
  }, [ url ])

  return <div className={styles.root}>
    <Card>
      <ColContainer>
        <TextInput invalidReason={message} isValid={urlIsValid} onChange={(e) => { setUrl(e.target.value) }} />
      </ColContainer>
    </Card>
  </div>
}

export default ServerLogin

ServerLogin.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>
}