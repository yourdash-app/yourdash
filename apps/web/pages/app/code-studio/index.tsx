import Head from "next/head";
import React from "react";
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import styles from "./index.module.scss"
import Chiplet from "ui";

const CodeStudio: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>YourDash | Code Studio</title>
      </Head>
      <Chiplet.Column
        className={ styles.root }
        style={ {
              background: `url(${require(`./background.svg`).default.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover"
            } }
      >
        <header className={ styles.header }>
          <section>
            <h1>Code Studio</h1>
            <span>2023</span>
          </section>
        </header>
        <main className={ styles.main }>
          <Chiplet.Column>
            <Chiplet.Card onClick={ () => {
                return console.log("Click")
              } }
            >Project Name</Chiplet.Card>
            <Chiplet.Card onClick={ () => {
                return console.log("Click")
              } }
            >Project Name</Chiplet.Card>
            <Chiplet.Card onClick={ () => {
                return console.log("Click")
              } }
            >Project Name</Chiplet.Card>
            <Chiplet.Card onClick={ () => {
                return console.log("Click")
              } }
            >Project Name</Chiplet.Card>
            <Chiplet.Card onClick={ () => {
                return console.log("Click")
              } }
            >Project Name</Chiplet.Card>
          </Chiplet.Column>
          <Chiplet.Column>
            <Chiplet.Button onClick={ () => {
                return console.log("Click")
              } }
            >Create project</Chiplet.Button>
            <Chiplet.Button onClick={ () => {
                return console.log("Click")
              } }
            >Open project</Chiplet.Button>
            <Chiplet.Button onClick={ () => {
                return console.log("Click")
              } }
            >Clone from GitHub</Chiplet.Button>
          </Chiplet.Column>
        </main>
        <footer className={ styles.footer }>
          <p>Ewsgit © 2023</p>
        </footer>
      </Chiplet.Column>
    </>
  )
};

export default CodeStudio;

CodeStudio.getLayout = page => {
  return <AppLayout transparentBackground>{page}</AppLayout>
}
