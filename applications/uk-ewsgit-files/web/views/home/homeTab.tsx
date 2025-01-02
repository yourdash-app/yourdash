/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useResource from "@yourdash/csi/useResource";
import Box from "@yourdash/uikit/components/box/box";
import Container from "@yourdash/uikit/components/container/container";
import Heading from "@yourdash/uikit/components/heading/heading";
import EndpointTabViewHome from "../../../shared/types/endpoints/tabView/home";
import { acsi } from "../../meta.yourdash";
import { IFilesView } from "../view";
import Connections from "./views/connections/connections";
import RecentFiles from "./views/recentFiles/recentFiles";
import SharedFiles from "./views/sharedFiles/sharedFiles";
import styles from "./homeTab.module.scss";
import CommonStorageLocations from "./views/commonStorageLocations/commonStorageLocations";

const HomeTabView: React.FC<{ view: IFilesView }> = ({ view }) => {
  const homeTabData = useResource(() => acsi.getJson("/tabView/home", "/tabView/home"), [view]);

  if (!homeTabData) {
    return (
      <>
        <Box className={styles.view}>
          <Heading text={"Home Loading..."} />
        </Box>
      </>
    );
  }

  return (
    <Container className={styles.view}>
      <section className={styles.content}>
        <CommonStorageLocations commonStorageLocations={homeTabData.commonStorageLocations} />
        <RecentFiles />
        <Connections connections={homeTabData.connections} />
        <SharedFiles />
      </section>
    </Container>
  );
};

export default HomeTabView;
