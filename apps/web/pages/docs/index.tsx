import { NextPageWithLayout } from './../page';
import DocsLayout from '../../components/layouts/docsLayout/DocsLayout';
import HomeLayout from '../../components/layouts/homeLayout/HomeLayout';

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
  return <HomeLayout>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
}