/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "web-client/src/helpers/csi";
import { Button } from "web-client/src/ui/index";

const SettingsStoreSection: React.FC = () => {
  return <>
    <Button
      onClick={() => {
        csi.getJson( "/app/settings/admin/dev/install_all_applications", data => {
          return 0;
        } ); }
      }
    >
      Install all applications
    </Button>
  </>
}

export default SettingsStoreSection
