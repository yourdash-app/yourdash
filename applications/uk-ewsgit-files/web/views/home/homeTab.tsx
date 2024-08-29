import useResource from "@yourdash/csi/useResource";
import Box from "@yourdash/uikit/components/box/box";
import Heading from "@yourdash/uikit/components/heading/heading";
import EndpointTabViewHome from "../../../shared/types/endpoints/tabView/home";
import { acsi } from "../../meta.yourdash";
import { IFilesView } from "../view";
import Connections from "./views/connections/connections";
import RecentFiles from "./views/recentFiles/recentFiles";
import SharedFiles from "./views/sharedFiles/sharedFiles";
import styles from "./homeTab.module.scss";

const HomeTabView: React.FC<{ view: IFilesView }> = ({ view }) => {
  const homeTabData = useResource(() => acsi.getJson<EndpointTabViewHome>("/tabView/home"), [view]);

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
    <Box className={styles.view}>
      <Heading text={"Home"} />
      <section className={styles.content}>
        <RecentFiles />
        <Connections connections={homeTabData.connections} />
        <SharedFiles />
      </section>
    </Box>
  );
};

export default HomeTabView;
