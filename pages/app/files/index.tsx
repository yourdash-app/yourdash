import Head from "next/head";
import React from "react";
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import FilesLayout from "./components/FilesLayout";
import File from "./components/File"

const Files: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>YourDash | Files</title>
      </Head>
      <File name="FileName" path="/file/path" type="file" />
      <File name="FileName" path="/file/path" type="folder" />
      <File name="FileName" path="/file/path" type="file" />
      <File name="FileName" path="/file/path" type="file" />
      <File name="FileName" path="/file/path" type="folder" />
      <File name="FileName" path="/file/path" type="file" />
      <File name="FileName" path="/file/path" type="file" />
      <File name="FileName" path="/file/path" type="file" />
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