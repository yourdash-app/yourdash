import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import SettingsLayout from './components/settingsLayout';

const SettingsIndex: NextPageWithLayout = () => {
  return (
    <>
      
    </>
  );
};

export default SettingsIndex;

SettingsIndex.getLayout = (page) => {
  return <AppLayout>
    <SettingsLayout>
      {page}
    </SettingsLayout>
  </AppLayout>
}