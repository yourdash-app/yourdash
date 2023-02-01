import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import styles from "./index.module.scss"
import ButtonLink from "ui/backup/elements/buttonLink/ButtonLink";

const Docs: NextPageWithLayout = () => {return (
  <>
    <section data-header="true">
      <img src={ "/background.jpg" } alt=""/>
    </section>
    <main>
      <h1>Chiplet UI components</h1>
      <section className={ styles.main }>
        <ButtonLink href={ `/docs/components/badges` }>Badges</ButtonLink>
        <ButtonLink href={ `/docs/components/navigation` }>Navigation</ButtonLink>
        <ButtonLink href={ `/docs/components/dialogs` }>Dialogs</ButtonLink>
      </section>
    </main>
  </>
)};

export default Docs;

Docs.getLayout = page => {return (
  <HomeLayout noFooter>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)}