import { Router } from 'next/router';
import AppLayout from '../../../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import SettingsLayout from '../../components/SettingsLayout';
import styles from "./index.module.scss"
import Chip from 'ui/backup/elements/chip/Chip';
import IconButton from 'ui/backup/elements/iconButton/IconButton';
import ProgressBar from 'ui/backup/elements/progressBar/ProgressBar';
import Spinner from 'ui/backup/elements/spinner/Spinner';
import TextBox from 'ui/backup/elements/textBox/TextBox';
import TextInput from 'ui/backup/elements/textInput/TextInput';
import ToggleSwitch from 'ui/backup/elements/toggleSwitch/ToggleSwitch';
import Tags from 'ui/backup/elements/tags/Tags';
import React from "react";
import Chiplet from "ui";
import DropdownButton from "ui/dropdownButton/DropdownButton";

const SettingsPanel: NextPageWithLayout = () => {
  const routeChange = () => {
    console.log("Attempting to save new values")
    Router.events.off("routeChangeStart", routeChange)
  }

  Router.events.on("routeChangeStart", routeChange)

  // const [ selectedTheme, setSelectedTheme ] = useState("One Half Dark")
  // const [ allowModification, setAllowModification ] = useState(false)

  return (
    <>
      <h1>Personal Color Theme</h1>
      <Chiplet.Column style={ { padding: "1rem" } }>
        <Chiplet.Card className={ styles.themeSelector }>
          <Chiplet.Row>
            <Chiplet.Column>
              <h3 style={ { marginTop: 0 } }>
                Select or create a theme
              </h3>
              <p>Select a theme to to use or to use as a template for your own.</p>
            </Chiplet.Column>
            <div
              style={ { marginLeft: "auto" } }
            >
              <DropdownButton items={ [
                  {
                    name: "One Half Dark",
                    onClick: () => {
                      console.log(`Implement Me!!!`)
                    }
                  }
                ] }
              >
                Select a theme
              </DropdownButton>
            </div>
          </Chiplet.Row>
        </Chiplet.Card>
        <Chiplet.Card>
          <Chiplet.Row>
            <Chiplet.Column>
              <h1>Theme Preview</h1>
              <Chiplet.Button onClick={ () => {
                  console.log(`Implement Me!!!`)
                } }
              >Button</Chiplet.Button>
              <Chiplet.Button
                onClick={ () => {
                      console.log(`Implement Me!!!`)
                    } }
                vibrant
              >Vibrant Button</Chiplet.Button>
              <Chiplet.Card>
                <Chiplet.Row>
                  <Chiplet.Button onClick={ () => {
                      console.log(`Implement Me!!!`)
                    } }
                  >Button</Chiplet.Button>
                  <Chiplet.Button
                    onClick={ () => {
                          console.log(`Implement Me!!!`)
                        } }
                    vibrant
                  >Vibrant Button</Chiplet.Button>
                </Chiplet.Row>
              </Chiplet.Card>
              <Chiplet.Card onClick={ () => {
                  console.log(`Implement Me!!!`)
                } }
              >
                Card Button
              </Chiplet.Card>
              <Chiplet.Row>
                <Chip label="Chip"/>
                <Chip label="Chip"/>
                <Chip active label="Chip"/>
                <Chip active label="Chip"/>
              </Chiplet.Row>
              <DropdownButton items={ [
                  {
                    name: "option",
                    onClick: () => {
                      console.log(`Implement Me!!!`)
                    }
                  },
                  {
                    name: "option",
                    onClick: () => {
                      console.log(`Implement Me!!!`)
                    }
                  }
                ] }
              >
                Dropdown Button
              </DropdownButton>
              <p>Icon Buttons</p>
              <Chiplet.Row>
                <IconButton
                  icon="bug-16"
                  onClick={ () => {
                        console.log(`Implement Me!!!`)
                      } }
                />
                <IconButton
                  icon="x-16"
                  onClick={ () => {
                        console.log(`Implement Me!!!`)
                      } }
                />
                <IconButton
                  icon="circle-16"
                  onClick={ () => {
                        console.log(`Implement Me!!!`)
                      } }
                />
                <IconButton
                  icon="server-error"
                  onClick={ () => {
                        console.log(`Implement Me!!!`)
                      } }
                />
                <IconButton
                  icon="yourdash-logo"
                  onClick={ () => {
                        console.log(`Implement Me!!!`)
                      } }
                />
                <IconButton
                  useDefaultColor
                  icon="yourdash-logo"
                  onClick={ () => {
                        console.log(`Implement Me!!!`)
                      } }
                />
              </Chiplet.Row>
              <ProgressBar value={ 20 }/>
              <ProgressBar displayPercentage value={ 50 }/>
              <ProgressBar displayPercentage value={ 10 }/>
              <Spinner/>
              <TextBox placeholder={ "Text box" }/>
              <TextInput placeholder='Text input'/>
              <p>Toggle Switches</p>
              <Chiplet.Row>
                <ToggleSwitch onValueChange={ () => {
                    console.log(`Implement Me!!!`)
                  } }
                />
                <ToggleSwitch onValueChange={ () => {
                    console.log(`Implement Me!!!`)
                  } }
                />
                <ToggleSwitch onValueChange={ () => {
                    console.log(`Implement Me!!!`)
                  } }
                />
              </Chiplet.Row>
              <Tags tags={ [
                  {
                    color: "#337733",
                    displayName: "Administrator",
                    name: "administrator"
                  },
                  {
                    color: "#434883",
                    displayName: "Administrator",
                    name: "administrator"
                  },
                  {
                    color: "#884466",
                    displayName: "Administrator",
                    name: "administrator"
                  },
                  {
                    color: "#938263",
                    displayName: "Administrator",
                    name: "administrator"
                  }
                ] }
              />
              <Tags
                compact
                tags={ [
                      {
                        color: "#337733",
                        displayName: "Administrator",
                        name: "administrator"
                      },
                      {
                        color: "#434883",
                        displayName: "Administrator",
                        name: "administrator"
                      },
                      {
                        color: "#884466",
                        displayName: "Administrator",
                        name: "administrator"
                      },
                      {
                        color: "#938263",
                        displayName: "Administrator",
                        name: "administrator"
                      }
                    ] }
              />
            </Chiplet.Column>
            <Chiplet.Column>
              <h1>Theme Editor</h1>

            </Chiplet.Column>
          </Chiplet.Row>
        </Chiplet.Card>
        <Chiplet.Card>
          <h3>Background image</h3>
          <Chiplet.Button onClick={ () => {
              console.log(`Implement Me!!!`)
            } }
          >Select an image</Chiplet.Button>
        </Chiplet.Card>
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
