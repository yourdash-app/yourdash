import AppLayout from "../../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../../page";
import BooleanSetting from "../../components/BooleanSetting";
import SettingsLayout from "../../components/SettingsLayout";
import { useState } from "react";
import Chiplet from "ui";

const SettingsPanel: NextPageWithLayout = () => {
    const [appLayoutSettings] = useState({
        floating: true,
        rounded: true,
    });
    return (
        <>
            <Chiplet.Column style={{ padding: "1rem" }}>
                <BooleanSetting
                    title="Rounded Application Windows"
                    description="Make applications have a rounded border (this is only available on desktop)"
                    defaultValue={appLayoutSettings.rounded}
                    setValue={(value) => {
                        console.log(value);
                    }}
                />
                <BooleanSetting
                    title="Floating Application Windows"
                    description="Add a margin around applications and show your background image (this is only available on desktop)"
                    defaultValue={appLayoutSettings.floating}
                    setValue={(value) => {
                        console.log(value);
                    }}
                />
            </Chiplet.Column>
        </>
    );
};

export default SettingsPanel;

SettingsPanel.getLayout = page => {
  return (
      <AppLayout>
          <SettingsLayout title={"Panel"}>{page}</SettingsLayout>
      </AppLayout>
  );
}
