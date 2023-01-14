import React, { useEffect } from 'react';
import ColContainer from '../../../../../components/containers/ColContainer/ColContainer';
import AuthenticatedImg from '../../../../../components/elements/authenticatedImg/AuthenticatedImg';
import TextBox from '../../../../../components/elements/textBox/TextBox';
import TextInput from '../../../../../components/elements/textInput/TextInput';
import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import BooleanSetting from '../../components/BooleanSetting';
import SettingsLayout from '../../components/SettingsLayout';
import styles from "./index.module.scss"
import SERVER, { verifyAndReturnJson } from '../../../../../lib/server';
import YourDashUser from '../../../../../types/core/user';
import Button from '../../../../../components/elements/button/Button';

const SettingsPanel: NextPageWithLayout = () => {
  const [ firstName, setFirstName ] = React.useState("")
  const [ lastName, setLastName ] = React.useState("")
  const [ userName, setUserName ] = React.useState("")
  const [ description, setDescription ] = React.useState("")
  const [ loaded, setLoaded ] = React.useState(false)

  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get(`/core/settings/user/profile`),
      (data) => {
        setFirstName(data.name.first)
        setLastName(data.name.last)
        setUserName(data.userName)
        setDescription(data.profile.description)
        setLoaded(true)
      },
      () => {
        console.error(`unable to fetch user data`)
      }
    )
  }, [])

  if (!loaded) return <></>

  return (
    <>
      <h1>Your Profile</h1>
      <ColContainer style={{ padding: "1rem" }}>
        <section className={styles.section1}>
          <ColContainer className={styles.section1ProfileCard}>
            <AuthenticatedImg src={`/core/settings/user/profile/image`} />
            <span className={styles.name}>{firstName} {lastName}</span>
            <span className={styles.username}>@{userName}</span>
            <p>{description}</p>
          </ColContainer>
          <ColContainer className={styles.section1EditPanel}>
            <p>First name</p>
            <TextInput placeholder='first name' defaultValue={firstName} onChange={(e) => {
              setFirstName(e.currentTarget.value)
            }} />
            <p>Last name</p>
            <TextInput placeholder='last name' defaultValue={lastName} onChange={(e) => {
              setLastName(e.currentTarget.value)
            }} />
            <p>Username</p>
            <TextInput placeholder='username' defaultValue={userName} onChange={(e) => {
              setUserName(e.currentTarget.value)
            }} />
            <p>Description</p>
            <TextBox placeholder='description' defaultValue={description} onChange={(e) => {
              setDescription(e.currentTarget.value)
            }} />
            <Button vibrant onClick={() => {
              // TODO: send the new data to the server

              verifyAndReturnJson(
                SERVER.post(`/core/settings/user/profile`, {
                  body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    description: description
                  })
                }),
                () => {
                  console.log(`user profile updated successfully`)
                },
                () => {
                  console.error(`unable to update user profile`)
                }
              )

            }}>Save</Button>
          </ColContainer>
        </section>
        <BooleanSetting title='Local discovery' description='Allow other users on this instance to view your profile' defaultValue={false} setValue={(value) => {
          console.log(value)
        }} />
        <BooleanSetting title='Global discovery' description='Allow other users on any YourDash instance to view your profile' defaultValue={false} setValue={(value) => {
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