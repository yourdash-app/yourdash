import { NextPageWithLayout } from "../../../page";
import DocsLayout from '../../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../../layouts/homeLayout/HomeLayout';
import styles from "./index.module.scss"
import Chiplet from "~/frontend/chipletui";

const Docs: NextPageWithLayout = () => {
  return (
    <>
      <section data-header="true">
        <img src={ "/background.jpg" } alt=""/>
      </section>
      <main>
        <h1>Chiplet UI components</h1>
        <section className={ styles.main }>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/badges` }>Badges</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/buttons` }>Buttons</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/cards` }>Cards</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/carousels` }>Carousels</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/chips` }>Chips</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/dialogs` }>Dialogs</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/dropdowns` }>Dropdowns</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/icons` }>Icons</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/menus` }>Menus</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/navigation` }>Navigation</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/progress-indicators` }>Progress
            indicators</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/switches` }>Switches</Chiplet.ButtonLink>
          <Chiplet.ButtonLink href={ `/docs/chipletui/components/text-inputs` }>Text inputs</Chiplet.ButtonLink>
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
