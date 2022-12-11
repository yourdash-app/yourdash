import { NextPageWithLayout } from './../page';
import DocsLayout from '../../components/layouts/docsLayout/DocsLayout';

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <h1>Docs</h1>
      <p>Not Coming Soon...</p>
    </>
  );
};

export default Docs;

Docs.getLayout = (page) => {
  return <DocsLayout>{page}</DocsLayout>
}