import { Router } from 'next/router';
import ColContainer from '../../../../../components/containers/ColContainer/ColContainer';
import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import BooleanSetting from '../../components/BooleanSetting';
import SettingsLayout from '../../components/SettingsLayout';
import Card from '../../../../../components/containers/card/Card';
import styles from "./index.module.scss"

const SettingsPanel: NextPageWithLayout = () => {
  let routeChange = () => {
    console.log("Attempting to save new values")
    Router.events.off("routeChangeStart", routeChange)
  }

  Router.events.on("routeChangeStart", routeChange)

  return (
    <>
      <h1>Personal Color Theme</h1>
      <ColContainer style={{
        padding: "1rem"
      }}>
        <Card className={styles.accentColorPicker}>
          <div style={{
            backgroundColor: "red"
          }}></div>
          <div style={{
            backgroundColor: "orange"
          }}></div>
          <div style={{
            backgroundColor: "yellow"
          }}></div>
          <div style={{
            backgroundColor: "green"
          }}></div>
          <div style={{
            backgroundColor: "cyan"
          }}></div>
          <div style={{
            backgroundColor: "blue"
          }}></div>
          <div style={{
            backgroundColor: "purple"
          }}></div>
          <div style={{
            backgroundColor: "magenta"
          }}></div>
          <div style={{
            backgroundColor: "pink"
          }}></div>
        </Card>
        <BooleanSetting title='Title' description='Description' defaultValue={false} setValue={(value) => {
          console.log(value)
        }} />
        <BooleanSetting title='Title' description='Description' defaultValue={false} setValue={(value) => {
          console.log(value)
        }} />
        <BooleanSetting title='Title' description='Description' defaultValue={false} setValue={(value) => {
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