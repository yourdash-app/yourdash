/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useResource from "@yourdash/csi/useResource";
import tun from "@yourdash/tunnel/src/index.js";
import UKBox from "@yourdash/uikit/src/components/box/UKBox.js";
import UKContainer from "@yourdash/uikit/src/components/container/UKContainer.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import { IFilesView } from "../view";
import Connections from "./views/connections/connections";
import RecentFiles from "./views/recentFiles/recentFiles";
import SharedFiles from "./views/sharedFiles/sharedFiles";
import styles from "./homeTab.module.scss";
import CommonStorageLocations from "./views/commonStorageLocations/commonStorageLocations";

const HomeTabView: React.FC<{ view: IFilesView }> = ({ view }) => {
  const homeTabData = useResource(() => tun.get("/app/uk-ewsgit-files/tabView/home", "json"), [view]);

  if (!homeTabData) {
    return (
      <>
        <UKBox className={styles.view}>
          <UKHeading text={"Home Loading..."} />
        </UKBox>
      </>
    );
  }

  return (
    <UKContainer className={styles.view}>
      <section className={styles.content}>
        {/* @ts-ignore */}
        <CommonStorageLocations commonStorageLocations={homeTabData.commonStorageLocations || []} />
        <RecentFiles />
        {/* @ts-ignore */}
        <Connections connections={homeTabData?.connections || []} />
        <SharedFiles />
      </section>
    </UKContainer>
  );
};

export default HomeTabView;
