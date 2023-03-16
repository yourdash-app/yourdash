import Chiplet from "ui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <section style={ { display: "flex", flexDirection: "column", gap: "0.25rem" } }>
      <Chiplet.ToggleSwitch
        onValueChange={
              () => {
                return 0
              }
            }
      />
      <Chiplet.ToggleSwitch
        onValueChange={
              () => {
                return 0
              }
            }
      />
      <Chiplet.ToggleSwitch
        onValueChange={
              () => {
                return 0
              }
            }
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
