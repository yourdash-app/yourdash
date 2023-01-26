import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import Link from "next/link";
import Badge from "ui/badges/Badge"
import ApplicationBar from "ui/navigation/ApplicationBar";

const Docs: NextPageWithLayout = () => (
  <>
    <section data-header>
      <img src={"/background.jpg"} alt=""/>
    </section>
    <main>
      <h1>Navigation</h1>


      <section style={{ height: "30rem" }}>
        <ApplicationBar actions={[ {
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
  <HomeLayout>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)