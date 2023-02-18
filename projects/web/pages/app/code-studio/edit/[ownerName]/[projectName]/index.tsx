import Head from "next/head";
import React from "react";
import AppLayout from '../../../../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../../page';
import styles from "./index.module.scss"
import Editor from "../../../components/editor/Editor";

const CodeStudio: NextPageWithLayout = () => {
  return (
      <>
        <Head>
          <title>Code Studio | Project</title>
        </Head>
        <main className={styles.root}>

          <Editor
              filePath={"/app/test.tsx"}
              displayName={"text.tsx"}
              onChange={() => {
                return 0
              }}
              content={
                `const a = foo(bar);

function foo(num) {
  return num += 2
}`
              }
          />

        </main>
      </>
  )
};

export default CodeStudio;

CodeStudio.getLayout = page => {
  return <AppLayout transparentBackground>{page}</AppLayout>
}
