import { NextPageWithLayout } from "../../page";
import DocsLayout from '../../../layouts/docsLayout/DocsLayout';
import HomeLayout from '../../../layouts/homeLayout/HomeLayout';
import Dialog from "ui/dialogs/Dialog";
import { useState } from "react";

const Docs: NextPageWithLayout = () => {
  const [dialogVisible, setDialogVisible] = useState(true)

  return (
    <>
      <section data-header="true">
        <img src={ "/background.jpg" } alt=""/>
      </section>
      <main>
        <h1>Dialogs</h1>
        <section style={ { height: "30rem" } }>
          {dialogVisible && (
          <Dialog onClose={ () => { console.log("dialog closed"); setDialogVisible(false) } }>
            <p>Test</p>
          </Dialog>
        )}
        </section>
      </main>
    </>
  )
}

export default Docs;

Docs.getLayout = page => {return (
  <HomeLayout noFooter>
    <DocsLayout>{page}</DocsLayout>
  </HomeLayout>
)}