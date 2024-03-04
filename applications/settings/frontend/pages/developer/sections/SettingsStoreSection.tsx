/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import csi from "@yourdash/csi/csi";
import useYourDashLib from "@yourdash/web-client/src/helpers/ydsh";
import { Button } from "@yourdash/web-client/src/ui/index";

const SettingsStoreSection: React.FC = () => {
  const ydsh = useYourDashLib();

  return (
    <>
      <Button
        onClick={() => {
          csi.getJson("/app/settings/developer/install-all-applications", () => {
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
