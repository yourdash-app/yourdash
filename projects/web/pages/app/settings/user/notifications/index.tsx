import AppLayout from "../../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../../page";
import BooleanSetting from "../../components/BooleanSetting";
import SettingsLayout from "../../components/SettingsLayout";
import Chiplet from "ui";

const SettingsPanel: NextPageWithLayout = () => {
    return (
        <>
            <Chiplet.Column style={{ padding: "1rem" }}>
                <BooleanSetting
                    title="Enable notifications"
                    description="Allow recieving notifications"
                    defaultValue={false}
                    setValue={(value) => {
                        console.log(value);
                    }}
                />
            </Chiplet.Column>
        </>
    );
};

export default SettingsPanel;

SettingsPanel.getLayout = (page) => {
    return (
        <AppLayout>
            <SettingsLayout title={"Notifications"}>{page}</SettingsLayout>
        </AppLayout>
    );
};
