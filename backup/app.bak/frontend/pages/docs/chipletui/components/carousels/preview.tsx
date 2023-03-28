import Chiplet from "~/frontend/chipletui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <Chiplet.Carousel>
      <h1>Page 1</h1>
      <h1>Page 2</h1>
      <h1>Page 3</h1>
      <h1>Page 4</h1>
    </Chiplet.Carousel>
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
