import { useState } from 'react';
import ColContainer from '../../../components/containers/ColContainer/ColContainer';
import RowContainer from '../../../components/containers/RowContainer/RowContainer';
import Button from '../../../components/elements/button/Button';
import RightClickMenu from '../../../components/elements/rightClickMenu/RightClickMenu';
import TextInput from '../../../components/elements/textInput/TextInput';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import SERVER from '../../../lib/server';
import { NextPageWithLayout } from '../../page';

const EndpointTester: NextPageWithLayout = () => {
  const [ response, setResponse ] = useState("")
  const [ responseDidError, setResponseDidError ] = useState(false)
  const [ queryUrl, setQueryUrl ] = useState("")
  const [ queryMethod, setQueryMethod ] = useState("GET")
  const [ queryHeaders, setQueryHeaders ] = useState({})
  const [ queryBody, setQueryBody ] = useState("")

  return (
    <div>
      <ColContainer>
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
          }
        ]}>
          <ColContainer>
            <p style={{ width: "100%", textAlign: "center", color: "var(--container-fg)", backgroundColor: "var(--container-bg)", marginTop: 0, padding: "0.5rem", boxSizing: "border-box" }}>{queryMethod}</p>
            <TextInput style={{
              color: responseDidError ? "var(--color-error-bg)" : "var(--text-input-fg)"
            }} onChange={(e) => { setQueryUrl(e.target.value); setResponseDidError(false) }} />
            <Button onClick={() => {
              switch (queryMethod) {
                case "GET":
                  SERVER.get(queryUrl, queryHeaders)
                    .then(res => {
                      if (res.status === 404)
                        return setResponseDidError(true)
                      res.json()
                        .then(json => {
                          if (json.error)
                            return setResponseDidError(true)
                          setResponse(JSON.stringify(json))
                        })
                    })
                  break;
                case "POST":
                  console.log(queryBody)
                  SERVER.post(queryUrl, { headers: queryHeaders, body: queryBody })
                    .then(res => {
                      if (res.status === 404)
                        return setResponseDidError(true)
                      res.json()
                        .then(json => {
                          if (json.error)
                            return setResponseDidError(true)
                          setResponse(JSON.stringify(json))
                        })
                    })
                  break;
              }
              setResponse("")
            }}>Send Request</Button>
          </ColContainer>
        </RightClickMenu>
        <RowContainer>
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
              height: "50rem",
              margin: 0,
              flexGrow: 1,
              padding: 0,
              border: "none",
              flexShrink: 1,
            }} onChange={(e) => { setQueryBody(e.target.value) }}></textarea> : <></>
          }
          <pre style={
            {
              backgroundColor: "var(--container-bg)",
              color: "var(--container-fg)",
              height: "50rem",
              flexGrow: 1,
              flexShrink: 1,
              margin: 0
            }
          }>
            {response}
          </pre>
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