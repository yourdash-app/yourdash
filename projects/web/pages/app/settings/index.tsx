import { useRouter } from 'next/router';
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import SettingsLayout from './components/SettingsLayout';
import styles from "./index.module.scss"
import Chiplet from "ui";

const SettingsIndex: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <Chiplet.Column className={ styles.root }>
      <div className={ styles.hero }>
        <h2>Settings</h2>
      </div>
      <Chiplet.Card
        className={ styles.card }
        onClick={
              () => {
                router.push(`/app/settings/user/profile`)
              }
            }
      >
        Profile
      </Chiplet.Card>
      <Chiplet.Card
        className={ styles.card }
        onClick={ () => {
              router.push(`/app/settings/user/panel`)
            } }
      >
        Panel
      </Chiplet.Card>
      <Chiplet.Card
        className={ styles.card }
        onClick={ () => {
              router.push(`/app/settings/user/notifications`)
            } }
      >
        Notifications
      </Chiplet.Card>
      <Chiplet.Card
        className={ styles.card }
        onClick={ () => {
              router.push(`/app/settings/user/theme`)
            } }
      >
        Personal Theme
      </Chiplet.Card>
    </Chiplet.Column>
  );
};

export default SettingsIndex;

SettingsIndex.getLayout = page => {
  return (
    <AppLayout>
      <SettingsLayout>
        {page}
      </SettingsLayout>
    </AppLayout>
  )
}