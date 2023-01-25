import CenteredContainer from "ui/containers/CenteredContainer/CenteredContainer";
import ColContainer from "ui/containers/ColContainer/ColContainer";
import Card from "ui/containers/card/Card";
import Button from "ui/elements/button/Button";
import TextInput from "ui/elements/textInput/TextInput";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";

const StoreIndex: NextPageWithLayout = () => (
  <CenteredContainer style={{ height: "100%" }}>
    <Card>
      <ColContainer>
        <h2>Login to your mastodon account to continue</h2>
        <TextInput placeholder="Instance address e.g: mastodon.social"/>
        <TextInput placeholder=""/>
        <TextInput placeholder="" type="password"/>
        <Button onClick={() => {
                console.log(`Implement Me!!!`)
              }}
        >Submit</Button>
      </ColContainer>
    </Card>
  </CenteredContainer>
  );

export default StoreIndex;

StoreIndex.getLayout = page => (
  <AppLayout>
    {page}
  </AppLayout>
)