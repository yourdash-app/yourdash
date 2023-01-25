import Head from "next/head";
import React from "react";
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import FilesLayout from "./components/FilesLayout";
import File from "./components/File"
import filesDirectory from "types/files/directory";
import filesFile from "types/files/file";

const Files: NextPageWithLayout = () => {
  const [ items, setItems ] = React.useState([
        {
          items: [],
          path: "/app/",
          type: "file",
          name: ""
        }
      ] as (filesFile & filesDirectory)[]
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
                return <File name="FileName" path="/file/path" type="file"/>
              case "directory":
                return <File name="FileName" path="/file/path" type="folder"/>
            }
          })
        }
    </>
  );
};

export default Files;

Files.getLayout = page => (
  <AppLayout>
    <FilesLayout>
      {page}
    </FilesLayout>
  </AppLayout>
)