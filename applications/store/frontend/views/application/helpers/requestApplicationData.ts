/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import type { IYourDashStoreApplication } from "@yourdash/shared/apps/store/storeApplication";
import csi from "@yourdash/csi/csi";

export function requestApplication(
  applicationId: string,
  setAppData: (data: IYourDashStoreApplication) => void,
  setIsLoading: (data: boolean) => void,
  navigate: (data: string) => void,
) {
  csi.getJson(
    `/app/store/application/${applicationId}`,
    (data) => {
      setAppData(data);
      setIsLoading(false);
    },
    () => {
      navigate("/app/a/store");
    },
  );
}
