import { Router } from 'next/router';
import ColContainer from '../../../../../components/containers/ColContainer/ColContainer';
import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import SettingsLayout from '../../components/SettingsLayout';
import Card from '../../../../../components/containers/card/Card';
import styles from "./index.module.scss"
import RowContainer from '../../../../../components/containers/RowContainer/RowContainer';
import DropdownButton from '../../../../../components/elements/dropdownButton/DropdownButton';
import CenteredContainer from '../../../../../components/containers/CenteredContainer/CenteredContainer';
import Button from '../../../../../components/elements/button/Button';
import CardButton from '../../../../../components/elements/cardButton/CardButton';
import Chip from '../../../../../components/elements/chip/Chip';
import IconButton from '../../../../../components/elements/iconButton/IconButton';
import ProgressBar from '../../../../../components/elements/progressBar/ProgressBar';
import Spinner from '../../../../../components/elements/spinner/Spinner';
import TextBox from '../../../../../components/elements/textBox/TextBox';
import TextInput from '../../../../../components/elements/textInput/TextInput';
import ToggleSwitch from '../../../../../components/elements/toggleSwitch/ToggleSwitch';
import Tags from '../../../../../components/elements/tags/Tags';

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
      <ColContainer style={{ padding: "1rem" }}>
        <Card className={styles.themeSelector}>
          <RowContainer>
            <ColContainer>
              <h3 style={{ marginTop: 0 }}>
                Select or create a theme
              </h3>
              <p>Select a theme to to use or to use as a template for your own.</p>
            </ColContainer>
            <CenteredContainer
              style={{ marginLeft: "auto" }}
            >
              <DropdownButton items={[
                {
                  name: "One Half Dark",
                  onClick: () => {
                    console.log(`Implement Me!!!`)
                  }
                }
              ]}>
                Select a theme
              </DropdownButton>
            </CenteredContainer>
          </RowContainer>
        </Card>
        <Card>
          <RowContainer>
            <ColContainer>
              <h1>Theme Preview</h1>
              <Button onClick={() => {
                console.log(`Implement Me!!!`)
              }}>Button</Button>
              <Button onClick={() => {
                console.log(`Implement Me!!!`)
              }} vibrant>Vibrant Button</Button>
              <Card>
                <RowContainer>
                  <Button onClick={() => {
                    console.log(`Implement Me!!!`)
                  }}>Button</Button>
                  <Button onClick={() => {
                    console.log(`Implement Me!!!`)
                  }} vibrant>Vibrant Button</Button>
                </RowContainer>
              </Card>
              <CardButton onClick={() => {
                console.log(`Implement Me!!!`)
              }}>
                Card Button
              </CardButton>
              <RowContainer>
                <Chip label="Chip" />
                <Chip label="Chip" />
                <Chip active label="Chip" />
                <Chip active label="Chip" />
              </RowContainer>
              <DropdownButton items={[
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
              ]}>
                Dropdown Button
              </DropdownButton>
              <p>Icon Buttons</p>
              <RowContainer>
                <IconButton icon="bug-16" onClick={() => {
                  console.log(`Implement Me!!!`)
                }} />
                <IconButton icon="x-16" onClick={() => {
                  console.log(`Implement Me!!!`)
                }} />
                <IconButton icon="circle-16" onClick={() => {
                  console.log(`Implement Me!!!`)
                }} />
                <IconButton icon="server-error" onClick={() => {
                  console.log(`Implement Me!!!`)
                }} />
                <IconButton icon="yourdash-logo" onClick={() => {
                  console.log(`Implement Me!!!`)
                }} />
                <IconButton useDefaultColor icon="yourdash-logo" onClick={() => {
                  console.log(`Implement Me!!!`)
                }} />
              </RowContainer>
              <ProgressBar value={20} />
              <ProgressBar displayPercentage value={50} />
              <ProgressBar displayPercentage value={10} />
              <Spinner />
              <TextBox placeholder={"Text box"} />
              <TextInput placeholder='Text input' />
              <p>Toggle Switches</p>
              <RowContainer>
                <ToggleSwitch onValueChange={() => {
                  console.log(`Implement Me!!!`)
                }}></ToggleSwitch>
                <ToggleSwitch onValueChange={() => {
                  console.log(`Implement Me!!!`)
                }}></ToggleSwitch>
                <ToggleSwitch onValueChange={() => {
                  console.log(`Implement Me!!!`)
                }}></ToggleSwitch>
              </RowContainer>
              <Tags tags={[
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
              ]} />
              <Tags compact tags={[
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
              ]} />
            </ColContainer>
            <ColContainer>
              <h1>Theme Editor</h1>

            </ColContainer>
          </RowContainer>
        </Card>
        <Card>
          <h3>Background image</h3>
          <Button onClick={() => {
            console.log(`Implement Me!!!`)
          }}>Select an image</Button>
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
