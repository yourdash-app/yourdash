import Chiplet from "~/frontend/chipletui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <section style={ { display: "flex", flexDirection: "row", gap: "0.25rem" } }>
      <Chiplet.Chip onClick={
          () => {
            console.log("chip clicked")
          }
        }
      >Chip</Chiplet.Chip>
      <Chiplet.Chip
        active
        onClick={
              () => {
                console.log("chip clicked")
              }
            }
      >Chip2</Chiplet.Chip>
      <Chiplet.Chip onClick={
          () => {
            console.log("chip clicked")
          }
        }
      >Chip3</Chiplet.Chip>
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
