/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import useYourDashLib from "@yourdash/shared/web/helpers/ydsh";
import Button from "@yourdash/chiplet/components/button/Button";
import React from "react";
import csi from "@yourdash/csi/csi";

const SettingsStoreSection: React.FC = () => {
  const ydsh = useYourDashLib();

  return (
    <>
      <Button
        onClick={() => {
          csi.syncGetJson("/app/settings/developer/install-all-applications", () => {
            // @ts-ignore
            window.__yourdashCorePanelReload();
            ydsh.toast.success("Devtools", "Installed all applications");

            return 0;
          });
        }}
      >
        Install all applications
      </Button>
    </>
  );
};

export default SettingsStoreSection;
