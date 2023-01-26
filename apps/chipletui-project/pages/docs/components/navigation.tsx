import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import Link from "next/link";
import Badge from "ui/badges/Badge"
import ActionBar from "ui/navigation/ActionBar";

const Docs: NextPageWithLayout = () => (
  <>
    <section data-header>
      <img src={"/background.jpg"} alt=""/>
    </section>
    <main>
      <h1>Navigation</h1>


      <section style={{ height: "30rem" }}>
        <ActionBar actions={[ {
            name: "test action", icon: "bruh", onClick: () => {
              console.log("action clicked!")
            }
          } ]}
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