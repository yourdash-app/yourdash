import Head from "next/head";
import React, { useEffect, useState } from "react";
import Button from "../../../components/elements/button/Button";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import SERVER from "../../../lib/server";
import YourDashUser from "../../../lib/user";
import { NextPageWithLayout } from '../../page';
import styles from "./dash.module.scss";

const Dash: NextPageWithLayout = () => {
  const [ name, setName ] = useState("")
  const [ currentTime, setCurrentTime ] = useState("00:01")

  useEffect(() => {
    SERVER.get("/get/current/user")
      .then((response) => {
        response.json().then((res: { error?: boolean; user: YourDashUser }) => {
          if (res.error) return console.error(`failed fetching the current user`)
          let user = res.user
          setName(user?.name?.first + " " + user?.name?.last)
        }).catch(() => setName("ERROR: Not valid JSON"))
      })
      .catch((err) => {
        setName(err)
      })
  }, [])

  useEffect(() => {
    setCurrentTime((new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`) + ":" + (new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`))

    let interval = setInterval(() => {
      setCurrentTime((new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`) + ":" + (new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`))
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (name === "") return <></>
  return (
    <>
      <Head>
        <title>YourDash | Dashboard</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.welcome}>
          <span className={styles.clock}>{currentTime}</span>
          <span>Hiya, {name}</span>
        </div>
        <div className={styles.main}>
          <div className={styles.homeMessage}>
            <div>
              <h1>Oh no!</h1>
              <p>It appears that you have no dash widgets installed.</p>
              <Button onClick={() => {
              }} vibrant>Explore dash widgets</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dash;

Dash.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>
}