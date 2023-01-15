import ColContainer from '../../../../../components/containers/ColContainer/ColContainer';
import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import BooleanSetting from '../../components/BooleanSetting';
import SettingsLayout from '../../components/SettingsLayout';

const SettingsPanel: NextPageWithLayout = () => {
  return (
    <>
      <h1>Panel</h1>
      <ColContainer style={{ padding: "1rem" }}>
        <BooleanSetting title='Rounded Application Windows' description='Make applications have a rounded border' defaultValue={false} setValue={(value) => {
          console.log(value)
        }} />
        <BooleanSetting title='Floating Application Windows' description='Add a margin around applications and show your background image' defaultValue={false} setValue={(value) => {
          console.log(value)
        }} />
      </ColContainer>
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