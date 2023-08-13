/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useState, useEffect } from "react";
import { Icon, Button, DropdownButton, TextBox } from "../../../ui";
import csi from "../../../helpers/csi";
import AutocompletedTextInput from "../../../ui/components/autocompletedTextInput/AutocompletedTextInput";
import { YourDashIcon } from "../../../ui/components/icon/iconDictionary";
import useTranslate from "../../../helpers/l10n";

function loadPossibleEndpoints( setEndpoints: ( data: string[] ) => void ) {
  csi.getJson( "/app/endpoints/endpoints", data => {
    const endpoints = data.map( ( endpoint: any ) => endpoint?.route?.path || null ).filter( ( endpoint: any ) => endpoint !== null );
    
    setEndpoints( endpoints );
  } );
}

const EndpointsApplication: React.FC = () => {
  const trans = useTranslate( "endpoints" );
  const [requestType, setRequestType] = useState<"Text" | "JSON">( "JSON" );
  const [requestMethod, setRequestMethod] = useState<"GET" | "POST" | "DELETE">( "GET" );
  const [requestHeaders, setRequestHeaders] = useState<{ [ key: string ]: string }>( {} );
  const [requestBody, setRequestBody] = useState<string>( "" );
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>( "" );
  const [endpoints, setEndpoints] = useState<string[]>( [] );
  const [loading, setLoading] = useState<boolean>( true );
  const [didError, setDidError] = useState<string | false>( false );
  const [response, setResponse] = useState<string>( "" );
  
  useEffect( () => {
    loadPossibleEndpoints( eps => setEndpoints( eps ) );
  }, [] );
  
  return (
    <main>
      <header className={"w-full p-3 flex items-center justify-between sticky top-0 bg-container-bg text-container-fg"}>
        <section className={"flex items-center justify-center h-full gap-2"}>
          <DropdownButton
            items={
              [
                {
                  name: "Get",
                  onClick() {
                    setRequestMethod( "GET" );
                  }
                },
                {
                  name: "Post",
                  onClick() {
                    setRequestMethod( "POST" );
                  }
                },
                {
                  name: "Delete",
                  onClick() {
                    setRequestMethod( "DELETE" );
                  }
                }
              ]
            }
          >
            {"Get"}
          </DropdownButton>
          <DropdownButton
            items={
              [
                {
                  name: "Text",
                  onClick() {
                    setRequestType( "Text" );
                  }
                },
                {
                  name: "JSON",
                  onClick() {
                    setRequestType( "JSON" );
                  }
                }
              ]
            }
          >
            {"JSON"}
          </DropdownButton>
        </section>
        <section className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
          <div className={"flex items-center justify-center h-full gap-1.5"}>
            <Icon className={"h-9 aspect-square"} useDefaultColor icon={YourDashIcon.YourDashLogo}/>
            <h2 className={"text-3xl font-semibold tracking-wide"}>
              {trans( "APPLICATION_NAME" )}
            </h2>
          </div>
        </section>
        <section className={"flex items-center justify-center h-full gap-2"}>
          <Button
            onClick={() => {
              setDidError( false );
              setLoading( true );
              
              switch ( requestMethod ) {
                case "GET":
                  switch ( requestType ) {
                    case "Text":
                      csi.getText( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    case "JSON":
                      csi.getJson( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    default:
                      setDidError( trans( "INTERNAL_ERROR" ) );
                  }
                  break;
                case "POST":
                  switch ( requestType ) {
                    case "Text":
                      csi.postText( selectedEndpoint, JSON.parse( requestBody ), data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    case "JSON":
                      csi.postJson( selectedEndpoint, JSON.parse( requestBody ), data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    default:
                      setDidError( trans( "INTERNAL_ERROR" ) );
                  }
                  break;
                case "DELETE":
                  switch ( requestType ) {
                    case "Text":
                      csi.deleteText( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    case "JSON":
                      csi.deleteJson( selectedEndpoint, data => {
                        setResponse( data );
                      }, error => {
                        setDidError( error );
                      }, requestHeaders );
                      break;
                    default:
                      setDidError( trans( "INTERNAL_ERROR" ) );
                  }
                  break;
                default:
                  setDidError( trans( "INTERNAL_ERROR" ) );
              }
            }}
          >
            {trans( "SEND_REQUEST.LABEL" )}
          </Button>
        </section>
      </header>
      <main className={"p-3 grid grid-cols-[2fr,3fr] gap-2"}>
        <section className={"bg-container-bg text-container-fg rounded-container-rounding p-2 h-max flex flex-col"}>
          <AutocompletedTextInput
            options={endpoints}
            label={"Request Endpoint"}
            onChange={value => {
              setSelectedEndpoint( value );
            }}
            className={"mb-2"}
          />
          {
            requestMethod !== "GET" && (
              <>
                <span className={"-mb-0.5 text-opacity-60 text-container-fg"}>{"Request Body"}</span>
                <TextBox
                  defaultValue={"{\n  \n}"}
                  onChange={e => {
                    setRequestBody( e.currentTarget.value );
                  }}
                />
              </>
            )
          }
          <span className={"-mb-0.5 text-opacity-60 text-container-fg"}>{"Request Extra Headers"}</span>
          <TextBox
            defaultValue={"{\n  \n}"}
            onChange={e => {
              setRequestHeaders( JSON.parse( e.currentTarget.value ) );
            }}
          />
        </section>
        {
          !loading && (
            <section className={"overflow-x-auto w-auto"}>
              <pre className={"bg-container-tertiary-bg text-container-fg p-4 rounded-container-rounding w-auto"}>
                {
                  requestType === "JSON"
                    ? JSON.stringify( response, null, 2 )
                    : response
                }
              </pre>
              {
                didError && (
                  <pre className={"bg-container-tertiary-bg text-red-400 p-4 rounded-container-rounding"}>
                    {
                      didError
                    }
                  </pre>
                )
              }
            </section>
          )
        }
      </main>
    </main>
  );
};

export default EndpointsApplication;
