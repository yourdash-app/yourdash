import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import SettingsLayout from './../../components/settingsLayout';

const SettingsPanel: NextPageWithLayout = () => {
  return (
    <>
      <h1>This is a test</h1>
    </>
  );
};

export default SettingsPanel;

SettingsPanel.getLayout = (page) => {
  return <AppLayout>
    <SettingsLayout>
      {page}
    </SettingsLayout>
  </AppLayout>
}