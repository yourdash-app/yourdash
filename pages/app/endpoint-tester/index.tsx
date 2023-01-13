import { useEffect, useState } from 'react';
import RowContainer from '../../../components/containers/RowContainer/RowContainer';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import DropdownButton from '../../../components/elements/dropdownButton/DropdownButton';
import styles from "./index.module.scss"
import TextInput from '../../../components/elements/textInput/TextInput';
import Button from '../../../components/elements/button/Button';
import SERVER, { verifyAndReturnJson } from '../../../lib/server';
import Card from '../../../components/containers/card/Card';
import TextBox from '../../../components/elements/textBox/TextBox';

const EndpointTester: NextPageWithLayout = () => {
  const [ response, setResponse ] = useState("")
  const [ responseDidError, setResponseDidError ] = useState(false)
  const [ queryUrl, setQueryUrl ] = useState("")
  const [ queryMethod, setQueryMethod ] = useState("GET" as "GET" | "POST" | "DELETE")
  const [ queryType, setQueryType ] = useState("json" as "json" | "text")
  const [ queryHeaders, /* setQueryHeaders */ ] = useState({})
  const [ queryBody, setQueryBody ] = useState("")
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
                setQueryType("json")
              }
            },
            {
              name: "Plain Text",
              onClick: () => {
                setQueryType("text")
              }
            },
          ]}
        >
          Expected response
        </DropdownButton>
      </RowContainer>
      <section>
        <RowContainer className={styles.urlSection}>
          <Button disabled>
            {serverUrl}/api
          </Button>
          <TextInput
            placeholder='path'
            onChange={(e) => {
              setQueryUrl(e.currentTarget.value)
            }} />
          <Button onClick={() => {
            switch (queryMethod) {
              case "GET":
                switch (queryType) {
                  case "json":
                    verifyAndReturnJson(
                      SERVER.get(queryUrl), (data) => {
                        setResponseDidError(false)
                        setResponse(JSON.stringify(data, null, 2))
                      },
                      () => {
                        setResponseDidError(true)
                      }
                    )
                    break;
                  case "text":

                    break;
                }
                break;
              case "POST":
                switch (queryType) {
                  case "json":
                    verifyAndReturnJson(
                      SERVER.post(queryUrl, { body: queryBody}), (data) => {
                        setResponseDidError(false)
                        setResponse(JSON.stringify(data, null, 2))
                      },
                      () => {
                        setResponseDidError(true)
                      }
                    )
                    break;
                  case "text":

                    break;
                }
                break;
              case "DELETE":
                switch (queryType) {
                  case "json":
                    verifyAndReturnJson(
                      SERVER.delete(queryUrl), (data) => {
                        setResponseDidError(false)
                        setResponse(JSON.stringify(data, null, 2))
                      },
                      () => {
                        setResponseDidError(true)
                      }
                    )
                    break;
                  case "text":

                    break;
                }
                break;
            }
          }}>
            Submit request
          </Button>
        </RowContainer>
        {
          queryMethod === "POST" && <TextBox style={{ resize: "vertical" }}></TextBox>
        }
        <Card>
          <pre style={{ margin: 0, overflow: "auto", paddingBottom: "0.5rem" }}>
            <code>
              {response}
            </code>
          </pre>
        </Card>
      </section>
    </main>
  );
};

export default EndpointTester;

EndpointTester.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}