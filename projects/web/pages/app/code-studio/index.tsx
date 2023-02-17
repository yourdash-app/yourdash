import Head from "next/head";
import React from "react";
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import Chiplet from "ui";
import styles from "./index.module.scss"

const CodeStudio: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>YourDash | Code Studio</title>
      </Head>
      <main className={ styles.root }>
        <header className={ styles.header }>
          <section>
            <h1>Code Studio</h1>
            <span>2023</span>
          </section>
        </header>
        <main className={ styles.main }>
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
          <Chiplet.Column>
            <Chiplet.Card
              compact
              className={ styles.projectCard }
              onClick={ () => {
                    return 0
                  } }
            >
              <h2>Test Project</h2>
              <span>Test project description</span>
            </Chiplet.Card>
            <Chiplet.Card
              compact
              className={ styles.projectCard }
              onClick={ () => {
                    return 0
                  } }
            >
              <h2>Test Project</h2>
              <span>Test project description</span>
            </Chiplet.Card>
            <Chiplet.Card
              compact
              className={ styles.projectCard }
              onClick={ () => {
                    return 0
                  } }
            >
              <h2>Test Project</h2>
              <span>Test project description</span>
            </Chiplet.Card>
          </Chiplet.Column>
        </main>
      </main>
    </>
  )
};

export default CodeStudio;

CodeStudio.getLayout = page => {
  return <AppLayout transparentBackground>{page}</AppLayout>
}
