import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import Chiplet from "ui"

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <section data-header="true">
        <img src={ "/background.jpg" } alt=""/>
      </section>
      <main>
        <h1>Badges</h1>

        <section>
          <Chiplet.Badge badgeCount={ 9 }>
            <p>This should have a badge</p>
          </Chiplet.Badge>
          <Chiplet.Badge badgeCount={ 1000 }>
            <p>This should have a badge</p>
          </Chiplet.Badge>
          <Chiplet.Badge badgeCount={ 0 }>
            <p>This should not have a badge</p>
          </Chiplet.Badge>
        </section>
      </main>
    </>
)
};

export default Docs;

Docs.getLayout = page => {return (
  <HomeLayout noFooter>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)}