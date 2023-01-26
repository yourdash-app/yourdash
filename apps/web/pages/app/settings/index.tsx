import { useRouter } from 'next/router';
import ColContainer from 'ui/backup/containers/ColContainer/ColContainer';
import CardButton from 'ui/backup/elements/cardButton/CardButton';
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import SettingsLayout from './components/SettingsLayout';
import styles from "./index.module.scss"

const SettingsIndex: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <ColContainer className={styles.root}>
      <div className={styles.hero}>
        <h2>Settings</h2>
      </div>
      <CardButton
        className={styles.card}
        onClick={() => {
              router.push(`/app/settings/user/profile`)
            }}
      >
        Profile
      </CardButton>
      <CardButton
        className={styles.card}
        onClick={() => {
              router.push(`/app/settings/user/panel`)
            }}
      >
        Panel
      </CardButton>
      <CardButton
        className={styles.card}
        onClick={() => {
              router.push(`/app/settings/user/notifications`)
            }}
      >
        Notifications
      </CardButton>
      <CardButton
        className={styles.card}
        onClick={() => {
              router.push(`/app/settings/user/theme`)
            }}
      >
        Personal Theme
      </CardButton>
    </ColContainer>
  );
};

export default SettingsIndex;

SettingsIndex.getLayout = page => (
  <AppLayout>
    <SettingsLayout>
      {page}
    </SettingsLayout>
  </AppLayout>
)