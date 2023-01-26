import { NextPageWithLayout } from '../page';
import DocsLayout from '../../layouts/docsLayout/DocsLayout';
import HomeLayout from "../../layouts/homeLayout/HomeLayout";

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <h1>Docs</h1>
      <p>Not Coming Soon...</p>
    </>
  );
};

export default Docs;

Docs.getLayout = page => (
    <HomeLayout noFooter>
      <DocsLayout>{page}</DocsLayout>
    </HomeLayout>
)