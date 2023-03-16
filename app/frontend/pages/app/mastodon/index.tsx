import AppLayout from "../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";
import Chiplet from "~/chipletui";

const StoreIndex: NextPageWithLayout = () => {
  return (
    <div style={ { height: "100%", display: "flex", alignItems: "center", justifyContent: "center" } }>
      <Chiplet.Card>
        <Chiplet.Column>
          <h2>Login to your mastodon account to continue</h2>
          <Chiplet.TextInput placeholder="Instance address e.g: mastodon.social"/>
          <Chiplet.TextInput placeholder=""/>
          <Chiplet.TextInput placeholder="" type="password"/>
          <Chiplet.Button
            disabled
            onClick={ () => {
                  console.log(`Implement Me!!!`)
                } }
          >Submit</Chiplet.Button>
        </Chiplet.Column>
      </Chiplet.Card>
    </div>
  )
};

export default StoreIndex;

StoreIndex.getLayout = page => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}
