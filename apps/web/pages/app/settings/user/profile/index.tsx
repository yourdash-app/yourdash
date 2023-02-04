import React, { useEffect } from 'react';
import AppLayout from '../../../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import BooleanSetting from '../../components/BooleanSetting';
import SettingsLayout from '../../components/SettingsLayout';
import styles from "./index.module.scss"
import SERVER, { verifyAndReturnJson } from '../../../../../server';
import Chiplet from "ui";
import ServerImage from "../../../components/serverImage/ServerImage";

const SettingsPanel: NextPageWithLayout = () => {
  const [ firstName, setFirstName ] = React.useState("")
  const [ lastName, setLastName ] = React.useState("")
  const [ userName, setUserName ] = React.useState("")
  const [ description, setDescription ] = React.useState("")
  const [ loaded, setLoaded ] = React.useState(false)

  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(`/core/settings/user/profile`),
        data => {
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

  if (!loaded) return <div/>

  return (
    <>
      <h1>Your Profile</h1>
      <Chiplet.Column style={ { padding: "1rem" } }>
        <section className={ styles.section1 }>
          <Chiplet.Column className={ styles.section1ProfileCard }>
            <ServerImage src={ `/core/settings/user/profile/image` }/>
            <span className={ styles.name }>{firstName} {lastName}</span>
            <span className={ styles.username }>@{userName}</span>
            <p>{description}</p>
          </Chiplet.Column>
          <Chiplet.Column className={ styles.section1EditPanel }>
            <p>First name</p>
            <Chiplet.TextInput
              placeholder='first name'
              defaultValue={ firstName }
              onChange={
                    e => {
                      setFirstName(e.currentTarget.value)
                    }
                  }
            />
            <p>Last name</p>
            <Chiplet.TextInput
              placeholder='last name'
              defaultValue={ lastName }
              onChange={
                    e => {
                      setLastName(e.currentTarget.value)
                    }
                  }
            />
            <p>Username</p>
            <Chiplet.TextInput
              placeholder='username'
              defaultValue={ userName }
              onChange={
                    e => {
                      setUserName(e.currentTarget.value)
                    }
                  }
            />
            <p>Description</p>
            <Chiplet.TextBox
              placeholder='description'
              defaultValue={ description }
              style={
                    {
                      resize: "vertical"
                    }
                  }
              onChange={
                    e => {
                      setDescription(e.currentTarget.value)
                    }
                  }
            />
            <Chiplet.Button
              vibrant
              onClick={ () => {

                    // TODO: send the new data to the server

                    verifyAndReturnJson(
                        SERVER.post(`/core/settings/user/profile`, {
                          body: JSON.stringify({
                            description,
                            firstName,
                            lastName,
                            userName,
                          })
                        }),
                        () => {
                          console.log(`user profile updated successfully`)
                        },
                        () => {
                          console.error(`unable to update user profile`)
                        }
                    )

                  } }
            >Save</Chiplet.Button>
          </Chiplet.Column>
        </section>
        <BooleanSetting
          title='Local discovery'
          description='Allow other users on this instance to view your profile'
          defaultValue={ false }
          setValue={ value => {
                console.log(value)
              } }
        />
        <BooleanSetting
          title='Global discovery'
          description='Allow other users on any YourDash instance to view your profile'
          defaultValue={ false }
          setValue={ value => {
                console.log(value)
              } }
        />
      </Chiplet.Column>
    </>
  );
};

export default SettingsPanel;

SettingsPanel.getLayout = page => {
  return (
    <AppLayout>
      <SettingsLayout>
        {page}
      </SettingsLayout>
    </AppLayout>
  )
}