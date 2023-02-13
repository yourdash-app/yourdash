import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import styles from "./index.module.scss"
import Chiplet from "ui";

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <section data-header="true">
        <img src={ "/background.jpg" } alt=""/>
      </section>
      <main>
        <h1>Chiplet UI components</h1>
        <section className={ styles.main }>
          <Chiplet.ButtonLink href={ `/docs/components/badges` }>Badges</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/components/navigation` }>Navigation</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/components/dialogs` }>Dialogs</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/components/buttons` }>Buttons</Chiplet.ButtonLink>
        </section>
      </main>
    </>
  )
};

export default Docs;

Docs.getLayout = page => {
  return (
    <HomeLayout noFooter>
      <DocsLayout>{page}</DocsLayout>
    </HomeLayout>
  )
}