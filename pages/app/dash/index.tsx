import Head from "next/head";
import React, { useEffect, useState } from "react";
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import RowContainer from "../../../components/containers/RowContainer/RowContainer";
import Card from "../../../components/elements/card/Card";
import Chip from "../../../components/elements/chip/Chip";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import SERVER from "../../../lib/server";
import { NextPageWithLayout } from '../../page';
import styles from "./dash.module.scss";

const Dash: NextPageWithLayout = () => {
  const [ userName, setUserName ] = useState("")
  const [ currentTime, setCurrentTime ] = useState("00:01")
  // const [ currentContentPage, setCurrentContentPage ] = useState("home")
  const [ currentContentPage, setCurrentContentPage ] = useState("rss")
  const [ visibleChips, setVisibleChips ] = useState([ { name: "Home", id: "home" }, { name: "Git Status", id: "git_status" }, { name: "Rss Feed", id: "rss" } ])

  useEffect(() => {
    SERVER.get("/get/current/user")
      .then(res => res.json())
      .then(res => {
        setUserName(res.name)
      })

    setCurrentTime((new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`) + ":" + (new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`))

    let interval = setInterval(() => {
      setCurrentTime((new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`) + ":" + (new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`))
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (userName === "") return <></>
  return (
    <>
      <Head>
        <title>YourDash | Dashboard</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.welcome}>
          <span className={styles.clock}>{currentTime}</span>
          <span>Hiya, {userName}</span>
        </div>
        <RowContainer className={styles.chips}>
          <>
            {
              visibleChips.map((chip, ind) => {
                return <Chip key={ind} label={chip.name} onClick={() => { setCurrentContentPage(chip.id) }} toggled={currentContentPage === chip.id} />
              })
            }
          </>
        </RowContainer>
        <div className={styles.main}>
          {returnDashCards(
            currentContentPage,
            <>
              <ColContainer>
                <Card>abcjdasjdfjhajksdhfd</Card>
                <Card>abcjdasjdfjhajksdhfd</Card>
                <Card>abcjdasjdfjhajksdhfd</Card>
                <Card>abcjdasjdfjhajksdhfd</Card>
              </ColContainer>
              <ColContainer>
                <Card>abcjdasjdfjhajksdhfd</Card>
                <Card>abc</Card>
              </ColContainer>
              <ColContainer>
                <Card>abc</Card>
                <Card>abc</Card>
                <Card>abcjdasjdfjhajksdhfd</Card>
                <Card>abc</Card>
              </ColContainer>
              <ColContainer>
                <Card>abcjdasjdfjhajksdhfd</Card>
                <Card>abc</Card>
              </ColContainer>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dash;

Dash.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>
}

function returnDashCards(currentContentPage: string, homeCards: React.ReactChild | React.ReactChild[]) {
  switch (currentContentPage) {
    case "home":
      return homeCards
    case "rss":
      fetch("")
      return <h1>This is a test</h1>
  }
}