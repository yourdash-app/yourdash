import Chiplet from "~/frontend/chipletui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <section style={ { height: "30rem" } }>
      <Chiplet.SideBar
        title={ "Test sideBar bar" }
        items={ [
              {
                label: "test action1",
                icon: "alert-16",
                onClick: () => {
                  console.log("action clicked!")
                }
              },
              {
                label: "test action2",
                icon: "alert-16",
                onClick: () => {
                  console.log("action clicked!")
                }
              },
              {
                label: "test action3",
                icon: "alert-16",
                onClick: () => {
                  console.log("action clicked!")
                }
              }
            ] }
      />
    </section>
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
