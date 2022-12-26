import { Router } from 'next/router';
import ColContainer from '../../../../../components/containers/ColContainer/ColContainer';
import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import SettingsLayout from '../../components/SettingsLayout';
import Card from '../../../../../components/containers/card/Card';
import styles from "./index.module.scss"

// import { useState } from 'react';
import RowContainer from '../../../../../components/containers/RowContainer/RowContainer';
import DropdownButton from '../../../../../components/elements/dropdownButton/DropdownButton';
import CenteredContainer from '../../../../../components/containers/CenteredContainer/CenteredContainer';

const SettingsPanel: NextPageWithLayout = () => {
  let routeChange = () => {
    console.log("Attempting to save new values")
    Router.events.off("routeChangeStart", routeChange)
  }

  Router.events.on("routeChangeStart", routeChange)

  // const [ selectedTheme, setSelectedTheme ] = useState("One Half Dark")
  // const [ allowModification, setAllowModification ] = useState(false)

  return (
    <>
      <h1>Personal Color Theme</h1>
      <ColContainer style={{
        padding: "1rem"
      }}>
        <Card className={styles.themeSelector}>
          <RowContainer>
            <ColContainer>
              <h3 style={{
                marginTop: 0
              }}>
                Select or create a theme
              </h3>
              <p>Select a theme to to use or to use as a template for your own.</p>
            </ColContainer>
            <CenteredContainer
              style={{
                marginLeft: "auto"
              }}
            >
              <DropdownButton items={[
                {
                  name: "One Half Dark",
                  onClick: () => { }
                }
              ]}>
                Select a theme
              </DropdownButton>
            </CenteredContainer>
          </RowContainer>
        </Card>
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