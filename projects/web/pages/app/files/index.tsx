import Head from "next/head";
import React, { useEffect } from "react";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";
import FilesLayout from "./components/FilesLayout/FilesLayout";
import File from "./components/File/File";
import { type filesDirectory } from "types/files/directory";
import { type filesFile } from "types/files/file";
import SERVER, { verifyAndReturnJson } from "../../../server";

const Files: NextPageWithLayout = () => {
    const [items, setItems] = React.useState([
        {
            // @ts-ignore
            items: [],
            path: "/app/",
            type: "file",
            name: "asd",
        },
    ] as (filesFile | filesDirectory)[]);

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get(`/files/dir/list/?path=/`),
            (data) => {
                setItems(data || []);
            },
            (err) => {
                console.error(err);
            }
        );
    }, []);

    return (
        <>
            <Head>
                <title>YourDash | Files</title>
            </Head>
            {items.map((item) => {
                switch (item.type) {
                    case "file":
                        return (
                            <File
                                key={item.path + item.name}
                                name={item.name}
                                path={`${item.path}${item.name}`}
                                type="file"
                            />
                        );
                    case "directory":
                        return (
                            <File
                                key={item.path + item.name}
                                name={item.name}
                                path={`${item.path}${item.name}`}
                                type="folder"
                            />
                        );
                }
            })}
        </>
    );
};

export default Files;

Files.getLayout = (page) => {
    return (
        <AppLayout>
            <FilesLayout>{page}</FilesLayout>
        </AppLayout>
    );
};
