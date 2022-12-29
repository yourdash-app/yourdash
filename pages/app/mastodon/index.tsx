import AppLayout from "../../../components/layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";

const StoreIndex: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Mastodon Client</h1>
    </div>
  );
};

export default StoreIndex;

StoreIndex.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}