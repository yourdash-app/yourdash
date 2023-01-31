import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import Dialog from "ui/dialogs/Dialog";

const Docs: NextPageWithLayout = () => (
  <>
    <section data-header="true">
      <img src={"/background.jpg"} alt=""/>
    </section>
    <main>
      <h1>Dialogs</h1>
      <section style={{ height: "30rem" }}>
        <Dialog>
          <p>Test</p>
        </Dialog>
      </section>
    </main>
  </>
);

export default Docs;

Docs.getLayout = page => (
  <HomeLayout noFooter>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)