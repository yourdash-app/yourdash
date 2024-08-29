import Heading from "@yourdash/uikit/components/heading/heading";
import HomeTabView from "../home/homeTab";
import { IFilesView } from "../view";
import ViewType from "../viewType";

const TabView: React.FC<{ view: IFilesView }> = ({ view }) => {
  switch (view.type) {
    case ViewType.HOME:
      return <HomeTabView view={view} />;
    default:
      return <Heading text={"Unknown TabView"} />;
  }
};

export default TabView;
