import Head from "next/head";
import React from "react";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import FilesLayout from "./FilesLayout";

const Files: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>YourDash | Files</title>
      </Head>

    </>
  );
};

export default Files;

Files.getLayout = (page) => {
  return <AppLayout>
    <FilesLayout>
      {page}
    </FilesLayout>
  </AppLayout>
}