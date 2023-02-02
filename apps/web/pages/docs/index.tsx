import { NextPageWithLayout } from "../page";
import DocsLayout from '../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../layouts/homeLayout/HomeLayout';
import Link from "next/link";

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <section data-header="true">
        <img src={ "/background.jpg" } alt=""/>
      </section>
      <main>
        <h1>Docs Overview</h1>
        <Link href={ "/docs/applications/list" }>
          Applications list
        </Link>
      </main>
    </>
  )
};

export default Docs;

Docs.getLayout = page => {
  return (
    <HomeLayout>
      <DocsLayout>{page}</DocsLayout>
    </HomeLayout>
  )
}