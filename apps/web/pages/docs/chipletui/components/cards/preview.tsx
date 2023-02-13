import Chiplet from "ui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <section style={ { display: "flex", flexDirection: "column", gap: "0.25rem" } }>
      <Chiplet.Card
        onClick={
              () => {
                console.log("test button")
              }
            }
      >Clickable card</Chiplet.Card>
      <Chiplet.Card>Card</Chiplet.Card>
      <Chiplet.Card
        onClick={
              () => {
                console.log("test button")
              }
            }
        compact
      >Clickable card (compact)</Chiplet.Card>
      <Chiplet.Card compact>Card (compact)</Chiplet.Card>
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
