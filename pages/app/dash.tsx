import { useEffect, useState } from "react";
import RowContainer from "../../components/containers/RowContainer/RowContainer";
import Card from "../../components/elements/card/Card";
import Chip from "../../components/elements/chip/Chip";
import AppLayout from '../../components/layouts/appLayout/AppLayout';
import Server from "../../lib/server";
import { NextPageWithLayout } from '../page';
import styles from "./dash.module.scss";

const Dash: NextPageWithLayout = () => {
  const [ userName, setUserName ] = useState("")
  const [ currentTime, setCurrentTime ] = useState("00:01")

  useEffect(() => {
    Server.get("/get/current/user")
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

  return (
    <div className={styles.root}>
      <div className={styles.welcome}>
        <span className={styles.clock}>{currentTime}</span>
        <span>Hiya, {userName}</span>
      </div>
      <RowContainer className={styles.chips}>
        <Chip label="this is a chip"></Chip>
        <Chip label="this is a chip"></Chip>
        <Chip label="this is a chip"></Chip>
        <Chip label="this is a chip"></Chip>
        <Chip label="this is a chip"></Chip>
      </RowContainer>
      <div className={styles.main}>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
        <Card>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, hic.</Card>
      </div>
    </div>
  );
};

export default Dash;

Dash.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>
}