import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import ActionBar from "ui/navigation/ActionBar";

const Docs: NextPageWithLayout = () => (
  <>
    <section data-header="true">
      <img src={"/background.jpg"} alt=""/>
    </section>
    <main>
      <h1>Navigation</h1>
      <section style={{ height: "30rem" }}>
        <ActionBar
          actions={[
                {
                  label: "test action1",
                  icon: "alert-16",
                  onClick: () => {
                    console.log("action clicked!")
                  }
                },
                {
                  label: "test action2",
                  icon: "alert-16",
                  onClick: () => {
                    console.log("action clicked!")
                  }
                },
                {
                  label: "test action3",
                  icon: "alert-16",
                  onClick: () => {
                    console.log("action clicked!")
                  }
                }
              ]}
          focusedActions={[
                {
                  label: "test",
                  icon: "apps-16",
                  onClick: () => {
                    console.log("focussed action clicked!")
                  }
                }
              ]}
        />
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