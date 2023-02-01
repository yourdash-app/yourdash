import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import Chiplet from "ui";

const Docs: NextPageWithLayout = () => {return (
  <>
    <section data-header="true">
      <img src={ "/background.jpg" } alt=""/>
    </section>
    <main>
      <h1>Buttons</h1>

      <section style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Chiplet.Button onClick={ () => { console.log("test button") } }>test button</Chiplet.Button>
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
    </main>
  </>
)};

export default Docs;

Docs.getLayout = page => {return (
  <HomeLayout noFooter>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)}