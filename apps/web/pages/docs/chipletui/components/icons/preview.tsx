import Chiplet from "ui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <section style={ { display: "flex", flexDirection: "column", gap: "0.25rem" } }>
      <Chiplet.Button
        onClick={
              () => {
                console.log("test button")
              }
            }
      >Button</Chiplet.Button>
      <Chiplet.Button
        vibrant
        onClick={
              () => {
                console.log("test button")
              }
            }
      >Button (vibrant)</Chiplet.Button>
      <Chiplet.SegmentButton buttons={ [
          {
            label: "segment 1",
            onClick: () => {
              console.log("segment 1")
            }
          },
          {
            label: "segment 2",
            onClick: () => {
              console.log("segment 2")
            }
          },
          {
            label: "segment 3",
            onClick: () => {
              console.log("segment 3")
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
