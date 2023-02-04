import Head from "next/head";
import React from "react";
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import FilesLayout from "./components/FilesLayout";
import File from "./components/File"
import { type filesDirectory } from "types/files/directory";
import { type filesFile } from "types/files/file";

const Files: NextPageWithLayout = () => {
  const [ items, setItems ] = React.useState([
        {
          // @ts-ignore
          items: [],
          path: "/app/",
          type: "file",
          name: "asd"
        }
      ] as (filesFile | filesDirectory)[]
  )

  return (
    <>
      <Head>
        <title>YourDash | Files</title>
      </Head>
      {
          items.map(item => {
            switch (item.type) {
              case "file":
                return <File key={ item.path } name={ item.name } path={ item.path } type="file"/>
              case "directory":
                return <File key={ item.path } name={ item.name } path={ item.path } type="folder"/>
            }
          })
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