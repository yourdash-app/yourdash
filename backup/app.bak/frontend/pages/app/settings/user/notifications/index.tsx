import AppLayout from "../../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../../page";
import BooleanSetting from "../../components/BooleanSetting/BooleanSetting";
import SettingsLayout from "../../components/SettingsLayout/SettingsLayout";
import Chiplet from "~/frontend/chipletui";

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
