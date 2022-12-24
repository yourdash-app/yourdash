import AppLayout from './../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from './../../../page';
import SettingsLayout from './../components/settingsLayout';

const Server: NextPageWithLayout = () => {
  return (
    <>
      <h1>This is a test</h1>
    </>
  );
};

export default Server;

Server.getLayout = (page) => {
  return <AppLayout>
    <SettingsLayout>
      {page}
    </SettingsLayout>
  </AppLayout>
}