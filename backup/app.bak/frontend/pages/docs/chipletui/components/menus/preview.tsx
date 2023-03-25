import Chiplet from "~/frontend/chipletui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <section style={ { display: "flex", flexDirection: "column", gap: "0.25rem" } }>
      <Chiplet.DropdownButton items={
          [
            {
              onClick: () => {
                console.log("item 0 clicked")
              },
              name: "Item 0",
            },
            {
              onClick: () => {
                console.log("item 1 clicked")
              },
              name: "Item 1",
            }
          ]
        }
      >Dropdown button</Chiplet.DropdownButton>
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
