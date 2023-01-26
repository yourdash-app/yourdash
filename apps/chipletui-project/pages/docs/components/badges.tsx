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
      <h1>Badges</h1>

      <section>
        <Badge badgeCount={9}>
          <p>This should have a badge</p>
        </Badge>
        <Badge badgeCount={1000}>
          <p>This should have a badge</p>
        </Badge>
        <Badge badgeCount={0}>
          <p>This should not have a badge</p>
        </Badge>
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