import { NextPageWithLayout } from './../page';
import DocsLayout from '../../components/layouts/docsLayout/DocsLayout';

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <div data-hero>
        <h1>YourDash Docs</h1>
        <p>Overview</p>
      </div>
    </>
  );
};

export default Docs;

Docs.getLayout = (page) => {
  return <DocsLayout>{page}</DocsLayout>
}