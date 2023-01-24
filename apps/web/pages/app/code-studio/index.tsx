import Head from "next/head";
import React from "react";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import Button from "../../../components/elements/button/Button";
import styles from "./index.module.scss"

const CodeStudio: NextPageWithLayout = () => {
  return (
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
            <Button onClick={() => {
              return
            }}>Project Name</Button>
            <Button onClick={() => {
              return
            }}>Project Name</Button>
            <Button onClick={() => {
              return
            }}>Project Name</Button>
            <Button onClick={() => {
              return
            }}>Project Name</Button>
            <Button onClick={() => {
              return
            }}>Project Name</Button>
          </ColContainer>
          <ColContainer>
            <Button onClick={() => {
              return
            }}>Create project</Button>
            <Button onClick={() => {
              return
            }}>Open project</Button>
            <Button onClick={() => {
              return
            }}>Clone from GitHub</Button>
          </ColContainer>
        </main>
        <footer className={styles.footer}>
          <p>Made by Ewsgit</p>
        </footer>
      </ColContainer>
    </>
  );
};

export default CodeStudio;

CodeStudio.getLayout = (page) => {
  return <AppLayout transparentBackground={true}>{page}</AppLayout>
}