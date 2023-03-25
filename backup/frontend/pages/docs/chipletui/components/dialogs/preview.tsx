import Chiplet from "~/frontend/chipletui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <Chiplet.Dialog
      visible
      onClose={
            () => {
              console.log("dialog closed");
            }
          }
    >
      <p>Test</p>
    </Chiplet.Dialog>
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
