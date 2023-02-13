import Chiplet from "ui";
import { NextPageWithLayout } from "../../../page";
import ComponentsLayout from "../componentsLayout";

const Preview: NextPageWithLayout = () => {
  return (
    <>
      <Chiplet.Badge badgeCount={ 9 }>
        <p>This should have a badge</p>
      </Chiplet.Badge>
      <Chiplet.Badge badgeCount={ 1000 }>
        <p>This should have a badge</p>
      </Chiplet.Badge>
      <Chiplet.Badge badgeCount={ 0 }>
        <p>This should not have a badge</p>
      </Chiplet.Badge>
    </>
  )
};

export default Preview;

Preview.getLayout = children => {
  return (
    <ComponentsLayout>
      {children}
    </ComponentsLayout>
  )
}
