import { NextPageWithLayout } from "../../../../page";
import DocsLayout from '../../../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../../../layouts/homeLayout/HomeLayout';
import componentsStyle from "../components.module.scss"
import Chiplet from "~/chipletui";
import { useRouter } from "next/router";

const Docs: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <>
      <section data-header="true">
        <img src={ "/background.jpg" } alt=""/>
      </section>
      <main>
        <Chiplet.Row style={ { alignItems: "center" } }>
          <Chiplet.IconButton
            icon={ "arrow-left-16" }
            onClick={
                  () => {
                    router.push(`/docs/chipletui/components`)
                  }
                }
            style={ { marginRight: "0.5rem" } }
          />
          <h1>Menus</h1>
        </Chiplet.Row>

        <iframe
          title={ "preview frame" }
          className={ componentsStyle.previewFrame }
          src={ `/docs/chipletui/components/menus/preview` }
        />
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
