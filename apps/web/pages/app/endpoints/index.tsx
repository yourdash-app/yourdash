import { useEffect, useState } from 'react';
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import styles from "./index.module.scss"
import SERVER, { verifyAndReturnJson } from '../../../server';
import Chiplet from "ui";

const EndpointTester: NextPageWithLayout = () => {
  const [ response, setResponse ] = useState("")
  const [ responseDidError, setResponseDidError ] = useState(false)
  const [ queryUrl, setQueryUrl ] = useState("")
  const [ queryModule, setQueryModule ] = useState("")
  const [ queryMethod, setQueryMethod ] = useState("GET" as "GET" | "POST" | "DELETE")
  const [ queryType, setQueryType ] = useState("json" as "json" | "text")
  const [ _queryHeaders, /* setQueryHeaders */ ] = useState({})
  const [ queryBody, setQueryBody ] = useState("")
  const [ serverUrl, setServerUrl ] = useState("")

  useEffect(() => {
    setServerUrl(localStorage.getItem("currentServer") || "")
  }, [])

  return (
    <main className={ styles.root }>
      <Chiplet.Row className={ styles.header }>
        <Chiplet.Icon name={ "yourdash-logo" } useDefaultColor style={ { height: "calc(100% - 0.125rem)" } }/>
        <h2>Server Endpoint Debugger</h2>
        <Chiplet.DropdownButton
          items={ [
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
              ] }
        >
          Select method
        </Chiplet.DropdownButton>
        <Chiplet.DropdownButton
          items={ [
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
              ] }
        >
          Expected response
        </Chiplet.DropdownButton>
      </Chiplet.Row>
      <section>
        <Chiplet.Row className={ styles.urlSection }>
          <Chiplet.Button disabled>
            {serverUrl}/api
          </Chiplet.Button>
          <Chiplet.TextInput
            style={ { maxWidth: "10rem" } }
            placeholder='module name'
            onChange={ e => {
                  setQueryModule(e.currentTarget.value)
                } }
          />
          <Chiplet.TextInput
            placeholder='path'
            onChange={ e => {
                  setQueryUrl(e.currentTarget.value)
                } }
          />
          <Chiplet.Button onClick={ () => {
              switch (queryMethod) {
                case "GET":
                  switch (queryType) {
                    case "json":
                      verifyAndReturnJson(
                          SERVER.get(`/${queryModule}${queryUrl}`), data => {
                            setResponseDidError(false)
                            setResponse(JSON.stringify(data, null, 2))
                          },
                          () => {
                            setResponseDidError(true)
                            setResponse("")
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
                          SERVER.post(`/${queryModule}${queryUrl}`, { body: queryBody }), data => {
                            setResponseDidError(false)
                            setResponse(JSON.stringify(data, null, 2))
                          },
                          () => {
                            setResponseDidError(true)
                            setResponse("")
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
                          SERVER.delete(`/${queryModule}${queryUrl}`), data => {
                            setResponseDidError(false)
                            setResponse(JSON.stringify(data, null, 2))
                          },
                          () => {
                            setResponseDidError(true)
                            setResponse("")
                          }
                      )
                      break;
                    case "text":

                      break;
                  }
                  break;
              }
            } }
          >
            Submit request
          </Chiplet.Button>
        </Chiplet.Row>
        {
              queryMethod === "POST" && (
              <Chiplet.TextBox
                style={ { resize: "vertical" } }
                onChange={ e => {
                        setQueryBody(e.currentTarget.value)
                      } }
              />
              )
          }
        <Chiplet.Card>
          {
            responseDidError && <h1 style={ { color: "var(--color-error-fg)", backgroundColor: "var(--color-error-bg)", maxWidth: "max-content", padding: "0.5rem", margin: 0 } }>This request received an error</h1>
          }
          <pre style={ {
              margin: 0, overflow: "auto", paddingBottom: "0.5rem"
            } }
          >
            <code>
              {response}
            </code>
          </pre>
        </Chiplet.Card>
      </section>
    </main>
  );
};

export default EndpointTester;

EndpointTester.getLayout = page => {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}
