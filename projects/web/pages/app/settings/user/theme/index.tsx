import { Router } from "next/router";
import AppLayout from "../../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../../page";
import SettingsLayout from "../../components/SettingsLayout";
import styles from "./index.module.scss";
import React from "react";
import Chiplet from "ui";

const SettingsPanel: NextPageWithLayout = () => {
    const routeChange = () => {
        console.log("Attempting to save new values");
        Router.events.off("routeChangeStart", routeChange);
    };

    Router.events.on("routeChangeStart", routeChange);

    // const [ selectedTheme, setSelectedTheme ] = useState("One Half Dark")
    // const [ allowModification, setAllowModification ] = useState(false)

    return (
        <>
            <Chiplet.Column style={{ padding: "1rem" }}>
                <Chiplet.Card className={styles.themeSelector}>
                    <Chiplet.Row>
                        <Chiplet.Column>
                            <h3 style={{ marginTop: 0 }}>Select or create a theme</h3>
                            <p>Select a theme to to use or to use as a template for your own.</p>
                        </Chiplet.Column>
                        <div style={{ marginLeft: "auto" }}>
                            <Chiplet.DropdownButton
                                items={[
                                    {
                                        name: "One Half Dark",
                                        onClick: () => {
                                            console.log(`Implement Me!!!`);
                                        },
                                    },
                                ]}
                            >
                                Select a theme
                            </Chiplet.DropdownButton>
                        </div>
                    </Chiplet.Row>
                </Chiplet.Card>
                <Chiplet.Card>
                    <Chiplet.Row>
                        <Chiplet.Column>
                            <h1>Theme Preview</h1>
                            <Chiplet.Button
                                onClick={() => {
                                    console.log(`Implement Me!!!`);
                                }}
                            >
                                Button
                            </Chiplet.Button>
                            <Chiplet.Button
                                onClick={() => {
                                    console.log(`Implement Me!!!`);
                                }}
                                vibrant
                            >
                                Vibrant Button
                            </Chiplet.Button>
                            <Chiplet.Card>
                                <Chiplet.Row>
                                    <Chiplet.Button
                                        onClick={() => {
                                            console.log(`Implement Me!!!`);
                                        }}
                                    >
                                        Button
                                    </Chiplet.Button>
                                    <Chiplet.Button
                                        onClick={() => {
                                            console.log(`Implement Me!!!`);
                                        }}
                                        vibrant
                                    >
                                        Vibrant Button
                                    </Chiplet.Button>
                                </Chiplet.Row>
                            </Chiplet.Card>
                            <Chiplet.Card
                                onClick={() => {
                                    console.log(`Implement Me!!!`);
                                }}
                            >
                                Card Button
                            </Chiplet.Card>
                            <Chiplet.Row>
                                <Chiplet.Chip>Chip</Chiplet.Chip>
                                <Chiplet.Chip>Chip</Chiplet.Chip>
                                <Chiplet.Chip active>Chip</Chiplet.Chip>
                                <Chiplet.Chip active>Chip</Chiplet.Chip>
                            </Chiplet.Row>
                            <Chiplet.DropdownButton
                                items={[
                                    {
                                        name: "option",
                                        onClick: () => {
                                            console.log(`Implement Me!!!`);
                                        },
                                    },
                                    {
                                        name: "option",
                                        onClick: () => {
                                            console.log(`Implement Me!!!`);
                                        },
                                    },
                                ]}
                            >
                                Dropdown Button
                            </Chiplet.DropdownButton>
                            <p>Icon Buttons</p>
                            <Chiplet.Row>
                                <Chiplet.IconButton
                                    icon="bug-16"
                                    onClick={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                                <Chiplet.IconButton
                                    icon="x-16"
                                    onClick={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                                <Chiplet.IconButton
                                    icon="circle-16"
                                    onClick={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                                <Chiplet.IconButton
                                    icon="server-error"
                                    onClick={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                                <Chiplet.IconButton
                                    icon="yourdash-logo"
                                    onClick={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                                <Chiplet.IconButton
                                    useDefaultColor
                                    icon="yourdash-logo"
                                    onClick={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                            </Chiplet.Row>
                            <Chiplet.ProgressBar value={0.2} />
                            <Chiplet.ProgressBar displayPercentage value={0.5} />
                            <Chiplet.ProgressBar displayPercentage value={0.1} />
                            <Chiplet.Spinner />
                            <Chiplet.TextBox placeholder={"Text box"} />
                            <Chiplet.TextInput placeholder="Text input" />
                            <p>Toggle Switches</p>
                            <Chiplet.Row>
                                <Chiplet.ToggleSwitch
                                    onValueChange={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                                <Chiplet.ToggleSwitch
                                    onValueChange={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                                <Chiplet.ToggleSwitch
                                    onValueChange={() => {
                                        console.log(`Implement Me!!!`);
                                    }}
                                />
                            </Chiplet.Row>
                            <Chiplet.Tags
                                tags={[
                                    {
                                        color: "#337733",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                    {
                                        color: "#434883",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                    {
                                        color: "#884466",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                    {
                                        color: "#938263",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                ]}
                            />
                            <Chiplet.Tags
                                compact
                                tags={[
                                    {
                                        color: "#337733",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                    {
                                        color: "#434883",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                    {
                                        color: "#884466",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                    {
                                        color: "#938263",
                                        displayName: "Administrator",
                                        name: "administrator",
                                    },
                                ]}
                            />
                        </Chiplet.Column>
                        <Chiplet.Column>
                            <h1>Theme Editor</h1>
                        </Chiplet.Column>
                    </Chiplet.Row>
                </Chiplet.Card>
                <Chiplet.Card>
                    <h3>Background image</h3>
                    <Chiplet.Button
                        onClick={() => {
                            console.log(`Implement Me!!!`);
                        }}
                    >
                        Select an image
                    </Chiplet.Button>
                </Chiplet.Card>
            </Chiplet.Column>
        </>
    );
};

export default SettingsPanel;

SettingsPanel.getLayout = page => {
  return (
      <AppLayout>
          <SettingsLayout title={"Personal color theme"}>{page}</SettingsLayout>
      </AppLayout>
  );
}
