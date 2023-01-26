import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import Link from "next/link";
import Badge from "ui/badges/Badge"

const Docs: NextPageWithLayout = () => (
  <>
    <section data-header>
      <img src={"/background.jpg"} alt=""/>
    </section>
    <main>
      <h1>Chiplet UI components</h1>

      <Link href={`/docs/components/badges`}>Badges</Link>
      <Link href={`/docs/components/navigation`}>Navigation</Link>
    </main>
  </>
);

export default Docs;

Docs.getLayout = page => (
  <HomeLayout noFooter>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)