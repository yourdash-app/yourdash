import { NextPageWithLayout } from "../page";
import DocsLayout from '../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../layouts/homeLayout/HomeLayout';
import Link from "next/link";

const Docs: NextPageWithLayout = () => (
  <>
    <section data-header>
      <img src={"/background.jpg"} alt=""/>
    </section>
    <main>
      <h1>Docs Overview</h1>
      <Link href={"/docs/applications/list"}>
        Applications list
      </Link>
      <Link href={"/docs/components/"}>
        Chiplet components
      </Link>
    </main>
  </>
);

export default Docs;

Docs.getLayout = page => (
  <HomeLayout>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)