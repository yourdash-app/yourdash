import Chiplet from "ui";
import ComponentsLayout from "../componentsLayout";
import { NextPageWithLayout } from "../../../../page";

const Preview: NextPageWithLayout = () => {
  return (
    <section style={ { display: "flex", flexDirection: "column", gap: "0.25rem", width: "50vw" } }>
      <Chiplet.ProgressBar value={ 0.2 } displayPercentage/>
      <Chiplet.ProgressBar value={ 0.7 } displayPercentage/>
      <Chiplet.ProgressBar value={ 0.3 }/>
      <Chiplet.ProgressBar value={ 0.8 }/>
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
