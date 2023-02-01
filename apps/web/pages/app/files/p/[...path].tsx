import Head from "next/head";
import React from "react";
import AppLayout from '../../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../page';
import FilesLayout from "../components/FilesLayout";
import { useRouter } from "next/router";

const Files: NextPageWithLayout = () => {
  const router = useRouter()
  const filePath = router.query.path || "/"
  
  return (
    <>
      <Head>
        <title>YourDash | Files</title>
      </Head>
      {
        filePath
      }
    </>
  );
};

export default Files;

Files.getLayout = page => {
  return (
    <AppLayout>
      <FilesLayout>
        {page}
      </FilesLayout>
    </AppLayout>
)
}
