import React from "react";
import AppLayout from "../../../../../../layouts/appLayout/AppLayout";
import SettingsLayout from "../../../components/SettingsLayout/SettingsLayout";
import { NextPageWithLayout } from "../../../../../page";
import Chiplet from "~/frontend/chipletui";
import { useRouter } from "next/router";

const ManageUser: NextPageWithLayout = () => {
    const router = useRouter();

    return (
        <Chiplet.Column>
            <h2>Manage user @{router.query.userSlug}</h2>
        </Chiplet.Column>
    );
};

export default ManageUser;

ManageUser.getLayout = (page) => {
    return (
        <AppLayout>
            <SettingsLayout title={"Manage server users"}>{page}</SettingsLayout>
        </AppLayout>
    );
};
