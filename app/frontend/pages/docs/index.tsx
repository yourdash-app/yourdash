import { NextPageWithLayout } from "../page";
import DocsLayout from '../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../layouts/homeLayout/HomeLayout';
import Chiplet from "~/chipletui"

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <section data-header="true">
        <img src={ "/background.jpg" } alt=""/>
      </section>
      <main>
        <h1>Docs Overview</h1>
        <section style={ { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "0.5rem" } }>
          <Chiplet.ButtonLink href={ "/docs/applications/list" }>
            Applications list
          </Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ "/docs/chipletui/components/" }>
            Chiplet components
          </Chiplet.ButtonLink>
        </section>
      </main>
    </>
  )
};

export default Docs;

Docs.getLayout = page => {
  return (
    <HomeLayout noFooter>
      <DocsLayout>{page}</DocsLayout>
    </HomeLayout>
  )
}
