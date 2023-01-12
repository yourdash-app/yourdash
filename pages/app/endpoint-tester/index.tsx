import { useEffect, useState } from 'react';
import RowContainer from '../../../components/containers/RowContainer/RowContainer';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import DropdownButton from '../../../components/elements/dropdownButton/DropdownButton';
import styles from "./index.module.scss"
import TextInput from '../../../components/elements/textInput/TextInput';
import Button from '../../../components/elements/button/Button';

const EndpointTester: NextPageWithLayout = () => {
  const [ response, setResponse ] = useState("")
  const [ responseDidError, setResponseDidError ] = useState(false)
  const [ queryUrl, setQueryUrl ] = useState("")
  const [ queryMethod, setQueryMethod ] = useState("GET" as "GET" | "POST" | "DELETE")
  const [ queryHeaders, /* setQueryHeaders */ ] = useState({})
  const [ queryBody, setQueryBody ] = useState({})
  const [ serverUrl, setServerUrl ] = useState("")

  useEffect(() => {
    setServerUrl(localStorage.getItem("currentServer") || "")
  }, [])

  return (
    <main className={styles.root}>
      <RowContainer className={styles.header}>
        <h2>YourDash Server Endpoint Debugger</h2>
        <DropdownButton
          items={[
            {
              name: "GET",
              onClick: () => {
                setQueryMethod("GET")
              }
            },
            {
              name: "POST",
              onClick: () => {
                setQueryMethod("POST")
              }
            },
            {
              name: "DELETE",
              onClick: () => {
                setQueryMethod("DELETE")
              }
            }
          ]}
        >
          Select method
        </DropdownButton>
        <DropdownButton
          items={[
            {
              name: "JSON",
              onClick: () => {
                setQueryMethod("GET")
              }
            },
            {
              name: "Plain Text",
              onClick: () => {
                setQueryMethod("POST")
              }
            },
          ]}
        >
          Expected response
        </DropdownButton>
      </RowContainer>
      <main>
        <RowContainer className={styles.urlSection}>
          <Button>
            {serverUrl}/api
          </Button>
          <DropdownButton items={[]}>
            Select a module
          </DropdownButton>
          <TextInput
            placeholder='path'
            onChange={(e) => {
              setQueryUrl(e.currentTarget.value)
            }} />
          <Button>
            Submit request
          </Button>
        </RowContainer>
      </main>
    </main>
  );
};

export default EndpointTester;

EndpointTester.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}