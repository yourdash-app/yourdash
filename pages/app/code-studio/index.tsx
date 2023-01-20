import Head from "next/head";
import React from "react";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';

const CodeStudio: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>YourDash | Code Studio</title>
      </Head>
      <div></div>
    </>
  );
};

export default CodeStudio;

CodeStudio.getLayout = (page) => {
  return <AppLayout transparentBackground={true}>{page}</AppLayout>
}