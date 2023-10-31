/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import csi from "web-client/src/helpers/csi";
import useYourDashLib from "web-client/src/helpers/ydsh";
import { Button } from "web-client/src/ui/index";

const SettingsStoreSection: React.FC = () => {
  const ydsh = useYourDashLib()
  
  return <>
    <Button
      onClick={() => {
        csi.getJson( "/app/settings/developer/install_all_applications", () => {
          // @ts-ignore
          window.__yourdashCorePanelReload();
          ydsh.toast.success( "Installed all applications" )
          
          return 0;
        } ); }
      }
    >
      Install all applications
    </Button>
  </>
}

export default SettingsStoreSection