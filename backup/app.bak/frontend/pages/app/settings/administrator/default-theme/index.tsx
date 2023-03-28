import AppLayout from "../../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../../page";
import SettingsLayout from "../../components/SettingsLayout/SettingsLayout";

const Index: NextPageWithLayout = () => {
    return <h1>This is a test</h1>;
};

export default Index;

Index.getLayout = (page) => {
    return (
        <AppLayout>
            <SettingsLayout title={"Default server theme"}>{page}</SettingsLayout>
        </AppLayout>
    );
};
