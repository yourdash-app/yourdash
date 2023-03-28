import AppLayout from "../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../page";
import SettingsLayout from "../components/SettingsLayout/SettingsLayout";
import { useRouter } from "next/router";
import React from "react";

const Index: NextPageWithLayout = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.push(`/app/settings/`);
    }, [router]);

    return <div />;
};

export default Index;

Index.getLayout = (page) => {
    return (
        <AppLayout>
            <SettingsLayout title={"Manage server users"}>{page}</SettingsLayout>
        </AppLayout>
    );
};
