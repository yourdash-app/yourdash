import { useState } from 'react';
import ColContainer from '../../../components/containers/ColContainer/ColContainer';
import RowContainer from '../../../components/containers/RowContainer/RowContainer';
import Button from '../../../components/elements/button/Button';
import RightClickMenu from '../../../components/elements/rightClickMenu/RightClickMenu';
import TextInput from '../../../components/elements/textInput/TextInput';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import SERVER, { verifyAndReturnJson } from '../../../lib/server';
import { NextPageWithLayout } from '../../page';

const EndpointTester: NextPageWithLayout = () => {
  const [ response, setResponse ] = useState("")
  const [ responseDidError, setResponseDidError ] = useState(false)
  const [ queryUrl, setQueryUrl ] = useState("")
  const [ queryMethod, setQueryMethod ] = useState("GET" as "GET" | "POST" | "DELETE")
  const [ queryHeaders, /* setQueryHeaders */ ] = useState({})
  const [ queryBody, setQueryBody ] = useState({})

  return (
    <div style={{
      borderRadius: "1rem",
      boxSizing: "border-box",
      height: "calc(100vh - calc(var(--app-panel-height) + 2rem))",
      margin: "1rem",
      overflow: "hidden",
    }}>
      <ColContainer style={{ height: "100%" }}>
        <RightClickMenu items={[
          {
            name: "GET", onClick: () => {
              setQueryMethod("GET")
            }
          },
          {
            name: "POST", onClick: () => {
              setQueryMethod("POST")
            }
          },
          {
            name: "DELETE", onClick: () => {
              setQueryMethod("DELETE")
            }
          }
        ]}>
          <ColContainer>
            <p style={{
              backgroundColor: "var(--container-bg)",
              boxSizing: "border-box",
              color: "var(--container-fg)",
              marginTop: 0,
              padding: "0.5rem",
              textAlign: "center",
              width: "100%",
            }}>{queryMethod}</p>
            <TextInput
              placeholder='server request path'
              style={{
                color: responseDidError ? "var(--color-error-bg)" : "var(--text-input-fg)",
                marginLeft: "0.25rem",
                marginRight: "0.25rem",
                width: "calc(100% - 0.5rem)",
              }}
              onChange={(e) => {
                setQueryUrl(e.target.value);
                setResponseDidError(false)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const sibling = e.currentTarget.nextElementSibling as HTMLButtonElement | null
                  if (!sibling) return
                  sibling.click()
                }
              }}
            />
            <Button
              style={{
                marginLeft: "0.25rem",
                marginRight: "0.25rem",
                width: "calc(100% - 0.5rem)"
              }}
              onClick={() => {
                switch (queryMethod) {
                  case "GET":
                    verifyAndReturnJson(
                      SERVER.get(queryUrl, queryHeaders),
                      (res) => {
                        setResponse(JSON.stringify(res, null, 2))
                      },
                      () => {
                        return setResponseDidError(true)
                      }
                    )
                    break;
                  case "POST":
                    verifyAndReturnJson(
                      SERVER.post(queryUrl, {
                        body: JSON.stringify(queryBody),
                        headers: queryHeaders,
                      }),
                      (res) => {
                        setResponse(JSON.stringify(res, null, 2))
                      },
                      () => {
                        return setResponseDidError(true)
                      }
                    )
                    break;
                  case "DELETE":
                    verifyAndReturnJson(
                      SERVER.delete(queryUrl),
                      (res) => {
                        setResponse(JSON.stringify(res, null, 2))
                      },
                      () => {
                        return setResponseDidError(true)
                      }
                    )
                }
                setResponse("")
                setResponseDidError(false)
              }}>Send Request</Button>
          </ColContainer>
        </RightClickMenu>
        <RowContainer style={{
          backgroundColor: "var(--container-bg)",
          display: "grid",
          gridTemplateColumns: "1fr",
          height: "100%",
          overflow: "auto",
        }}>
          {
            queryMethod === "POST" ? <textarea onKeyDown={(e) => {
              if (e.key === "Tab") {
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const value = e.currentTarget.value;
                e.currentTarget.value = value.substring(0, start) + "\t" + value.substring(end)
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
                e.preventDefault();
              }
            }} style={{
              border: "none",
              fontFamily: "monospace",
              fontSize: "1.25rem",
              height: "100%",
              margin: 0,
              padding: "0.5rem",
              resize: 'none',
            }} onChange={(e) => {
              try {
                const json = JSON.parse(e.target.value);
                setQueryBody(json)
              } catch (e) {
                setQueryBody({ error: "endpoint tester invalid json" })
              }
            }}></textarea> : <></>
          }
          <code>
            <pre style={
              {
                color: "var(--container-fg)",
                fontFamily: "monospace",
                fontSize: "1.25rem",
                margin: 0,
                padding: "1rem",
              }
            }>
              {response}
            </pre>
          </code>
        </RowContainer>
      </ColContainer>
    </div>
  );
};

export default EndpointTester;

EndpointTester.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}