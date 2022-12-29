import CenteredContainer from "../../../components/containers/CenteredContainer/CenteredContainer";
import ColContainer from "../../../components/containers/ColContainer/ColContainer";
import Card from "../../../components/containers/card/Card";
import Button from "../../../components/elements/button/Button";
import TextInput from "../../../components/elements/textInput/TextInput";
import AppLayout from "../../../components/layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";

const StoreIndex: NextPageWithLayout = () => {
  return (
    <>
      <CenteredContainer style={{ height: "100%" }}>
        <Card>
          <ColContainer>
            <h2>Login to your mastodon account to continue</h2>
            <TextInput placeholder="Instance address e.g: mastodon.social"></TextInput>
            <TextInput placeholder=""></TextInput>
            <TextInput placeholder="" type="password"></TextInput>
            <Button onClick={() => { }}>Submit</Button>
          </ColContainer>
        </Card>
      </CenteredContainer>
    </>
  );
};

export default StoreIndex;

StoreIndex.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}