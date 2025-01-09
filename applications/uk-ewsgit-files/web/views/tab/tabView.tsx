import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import HomeTabView from "../home/homeTab";
import { IFilesView } from "../view";
import ViewType from "../viewType";

const TabView: React.FC<{ view: IFilesView }> = ({ view }) => {
  switch (view.type) {
    case ViewType.HOME:
      return <HomeTabView view={view} />;
    default:
      return <UKHeading text={"Unknown TabView"} />;
  }
};

export default TabView;
