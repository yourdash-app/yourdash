import Head from "next/head";
import React from "react";
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import ColContainer from "ui/containers/ColContainer/ColContainer";
import Button from "ui/elements/button/Button";
import styles from "./index.module.scss"

const CodeStudio: NextPageWithLayout = () => (
  <>
    <Head>
      <title>YourDash | Code Studio</title>
    </Head>
    <ColContainer className={styles.root}>
      <header className={styles.header}>
        <section>
          <h1>Code Studio</h1>
          <span>2023</span>
        </section>
      </header>
      <main className={styles.main}>
        <ColContainer>
          <Button onClick={() => console.log("Click")}>Project Name</Button>
          <Button onClick={() => console.log("Click")}>Project Name</Button>
          <Button onClick={() => console.log("Click")}>Project Name</Button>
          <Button onClick={() => console.log("Click")}>Project Name</Button>
          <Button onClick={() => console.log("Click")}>Project Name</Button>
        </ColContainer>
        <ColContainer>
          <Button onClick={() => console.log("Click")}>Create project</Button>
          <Button onClick={() => console.log("Click")}>Open project</Button>
          <Button onClick={() => console.log("Click")}>Clone from GitHub</Button>
        </ColContainer>
      </main>
      <footer className={styles.footer}>
        <p>Made by Ewsgit</p>
      </footer>
    </ColContainer>
  </>
);

export default CodeStudio;

CodeStudio.getLayout = page => <AppLayout transparentBackground>{page}</AppLayout>