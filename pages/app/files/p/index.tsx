import Head from "next/head";
import React, { useEffect } from "react";
import AppLayout from '../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../page';
import FilesLayout from "../components/FilesLayout";
import { useRouter } from "next/router";

const Files: NextPageWithLayout = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(`/app/files/`)
  }, [])

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