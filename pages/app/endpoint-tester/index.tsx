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
      boxSizing: "border-box",
      margin: "1rem",
      borderRadius: "1rem",
      overflow: "hidden",
      height: "calc(100vh - calc(var(--app-panel-height) + 2rem))"
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
              width: "100%",
              textAlign: "center",
              color: "var(--container-fg)",
              backgroundColor: "var(--container-bg)",
              marginTop: 0,
              padding: "0.5rem",
              boxSizing: "border-box"
            }}>{queryMethod}</p>
            <TextInput
              placeholder='server request path'
              style={{
                color: responseDidError ? "var(--color-error-bg)" : "var(--text-input-fg)",
                marginRight: "0.25rem",
                marginLeft: "0.25rem",
                width: "calc(100% - 0.5rem)"
              }}
              onChange={(e) => {
                setQueryUrl(e.target.value);
                setResponseDidError(false)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  let sibling = e.currentTarget.nextElementSibling as HTMLButtonElement | null
                  if (!sibling) return
                  sibling.click()
                }
              }}
            />
            <Button
              style={{
                marginRight: "0.25rem",
                marginLeft: "0.25rem",
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
                        headers: queryHeaders,
                        body: JSON.stringify(queryBody)
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
          height: "100%",
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          backgroundColor: "var(--container-bg)",
        }}>
          {
            queryMethod === "POST" ? <textarea onKeyDown={(e) => {
              if (e.key === "Tab") {
                var start = e.currentTarget.selectionStart;
                var end = e.currentTarget.selectionEnd;
                var value = e.currentTarget.value;
                e.currentTarget.value = value.substring(0, start) + "\t" + value.substring(end)
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
                e.preventDefault();
              }
            }} style={{
              height: "100%",
              margin: 0,
              padding: "0.5rem",
              border: "none",
              resize: 'none',
              fontFamily: "monospace",
              fontSize: "1.25rem"
            }} onChange={(e) => {
              try {
                let json = JSON.parse(e.target.value);
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
                margin: 0,
                padding: "1rem",
                fontFamily: "monospace",
                fontSize: "1.25rem"
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