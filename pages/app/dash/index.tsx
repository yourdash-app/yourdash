import React, { useEffect, useState } from "react";
import RowContainer from "../../../components/containers/RowContainer/RowContainer";
import Card from "../../../components/elements/card/Card";
import Chip from "../../../components/elements/chip/Chip";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { getServer } from "../../../lib/server";
import { NextPageWithLayout } from '../../page';
import styles from "./dash.module.scss";

const Dash: NextPageWithLayout = () => {
  const [ userName, setUserName ] = useState("")
  const [ currentTime, setCurrentTime ] = useState("00:01")
  // const [ currentContentPage, setCurrentContentPage ] = useState("home")
  const [ currentContentPage, setCurrentContentPage ] = useState("rss")
  const [ visibleChips, setVisibleChips ] = useState(["home", "git_status", "rss"])

  useEffect(() => {
    getServer("/get/current/user")
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
    <div className={styles.root}>
      <div className={styles.welcome}>
        <span className={styles.clock}>{currentTime}</span>
        <span>Hiya, {userName}</span>
      </div>
      <RowContainer className={styles.chips}>
        <Chip label="Git Status"></Chip>
        <Chip label="Rss Feed"></Chip>
      </RowContainer>
      <div className={styles.main}>
        {returnDashCards(
          currentContentPage,
          <>
            <Card>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis animi voluptatem aut nisi distinctio nesciunt repellat et sequi amet soluta.</Card>
            <Card>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis animi voluptatem aut nisi distinctio nesciunt repellat et sequi amet soluta.</Card>
            <Card>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis animi voluptatem aut nisi distinctio nesciunt repellat et sequi amet soluta.</Card>
            <Card>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis animi voluptatem aut nisi distinctio nesciunt repellat et sequi amet soluta.</Card>
          </>
        )}
      </div>
    </div>
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
      return
  }
}