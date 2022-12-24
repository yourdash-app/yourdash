import { useRouter } from 'next/router';
import ColContainer from '../../../components/containers/ColContainer/ColContainer';
import CardButton from '../../../components/elements/cardButton/CardButton';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import SettingsLayout from './components/settingsLayout';
import styles from "./index.module.scss"

const SettingsIndex: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <>
      <ColContainer className={styles.root}>
        <div className={styles.hero}>
          <h2>Settings</h2>
        </div>
        <CardButton
          className={styles.card}
          onClick={() => {
            router.push(`/app/settings/user/profile`)
          }}>
          Profile
        </CardButton>
        <CardButton
          className={styles.card}
          onClick={() => {
            router.push(`/app/settings/user/panel`)
          }}>
          Panel
        </CardButton>
        <CardButton
          className={styles.card}
          onClick={() => {
            router.push(`/app/settings/user/profile`)
          }}>
          Profile
        </CardButton>
        <CardButton
          className={styles.card}
          onClick={() => {
            router.push(`/app/settings/user/profile`)
          }}>
          Profile
        </CardButton>
        <CardButton
          className={styles.card}
          onClick={() => {
            router.push(`/app/settings/user/profile`)
          }}>
          Profile
        </CardButton>
      </ColContainer>
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