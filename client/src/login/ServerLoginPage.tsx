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

import clippy from "helpers/clippy";
import React, { useEffect, useState } from "react";
import csi from "../helpers/csi";
import { Card, Column, Dialog, IconButton, MajorButton, TextInput } from "../ui";
import { useNavigate } from "react-router-dom";
import { YourDashIcon } from "../ui/components/icon/iconDictionary";

const SelectUser: React.FC<{
  setSelectedUser: ( username: string ) => void;
  serverUrl: string;
  setName: ( name: {
    first: string;
    last: string
  } ) => void;
}> = ( {
  setSelectedUser,
  serverUrl,
  setName
} ) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>( "" );
  const [validUser, setValidUser] = useState( true );
  
  return (
    <>
      <IconButton
        icon={YourDashIcon.ChevronLeft16}
        className={"left-2 top-2 fixed animate__animated animate__fadeInLeft animate__1250ms"}
        onClick={() => {
          localStorage.removeItem( "current_server" );
          navigate( "/login" );
        }}
      />
      <Card
        className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__fadeIn animate__1250ms"}
      >
        <Column>
          <TextInput
            label={"Username"}
            mustMatchRegex={/[a-z]|[0-9]/}
            onKeyDown={e => {
              if ( e.key === "Enter" ) {
                if ( username === null ) {
                  return;
                }
                
                csi.getJson(
                  `/core/login/user/${ username }`,
                  ( json: {
                    name: {
                      first: string;
                      middle: string;
                      last: string
                    }
                  } ) => {
                    setSelectedUser( username );
                    setName( json.name );
                  },
                  () => {
                    setValidUser( false );
                  }
                );
              }
            }
            }
            onChange={value => {
              setUsername( value );
            }}
          />
          <MajorButton
            disabled={username === ""}
            onClick={() => {
              if ( username === "" ) {
                return;
              }
              
              csi.getJson(
                `/core/login/user/${ username }`,
                ( json: {
                  name: {
                    first: string;
                    middle: string;
                    last: string
                  }
                } ) => {
                  setSelectedUser( username );
                  setName( json.name );
                },
                () => {
                  setValidUser( false );
                }
              );
            }}
          >
            Continue
          </MajorButton>
        </Column>
      </Card>
      {!validUser && (
        <Dialog
          title={"This user does not exist"}
          onClose={() => setValidUser( true )}
        />
      )}
    </>
  );
};

const LoginAsUser: React.FC<{
  name: {
    first: string;
    last: string
  };
  username: string;
  serverUrl: string;
}> = ( {
  name,
  username,
  serverUrl
} ) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string | null>( null );
  
  return (
    <>
      <IconButton
        icon={YourDashIcon.ChevronLeft16}
        className={"left-2 top-2 fixed animate__animated animate__fadeInLeft"}
        onClick={() => window.location.reload()}
      />
      <Card
        className={clippy( "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 flex flex-col" +
                            " animate__animated animate__fadeIn" )}
      >
        <img
          alt=""
          src={`${ serverUrl }/core/login/user/${ username }/avatar`}
          className={"rounded-xl aspect-square h-64"}
        />
        <span className={"text-center text-2xl tracking-wide font-medium text-base-50"}>
          {name.first} {name.last}
        </span>
        <span className={"text-center text-md text-base-200 tracking-wide font-medium -mt-3"}>{username}</span>
        <TextInput
          label={"password"}
          onKeyDown={e => {
            if ( e.key === "Enter" ) {
              csi.postJson(
                `/core/login/user/${ username }/authenticate`,
                { password },
                response => {
                  localStorage.setItem( "session_token", response.token );
                  localStorage.setItem( "username", username );
                  navigate( "/app" );
                },
                err => {
                  console.error( err );
                },
                {
                  type: localStorage.getItem( "desktop_mode" ) ? "desktop" : "web"
                }
              );
            }
          }}
          onChange={value => {
            setPassword( value );
          }}
        />
        <MajorButton
          onClick={() => {
            csi.postJson(
              `/core/login/user/${ username }/authenticate`,
              { password },
              response => {
                localStorage.setItem( "session_token", response.token );
                localStorage.setItem( "username", username );
                navigate( "/app" );
              },
              err => {
                console.error( err );
              }
            );
          }}
        >
          Login
        </MajorButton>
      </Card>
    </>
  );
};

const ServerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<null | string>( null );
  const [name, setName] = useState<{
    first: string;
    last: string
  }>( {
    first: "Unknown",
    last: "User"
  } );
  const [serverUrl, setServerUrl] = useState<null | string>( null );
  
  useEffect( () => {
    setServerUrl( localStorage.getItem( "current_server" ) );
    
    if ( localStorage.getItem( "session_token" ) ) {
      navigate( "/app" );
    }
  }, [navigate] );
  
  if ( !serverUrl ) {
    return null;
  }
  
  return (
    <>
      <div className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__fadeIn"}>
        <span className={"text-base-50 font-semibold text-3xl"}>Waiting for instance...</span>
      </div>
      <main
        style={{ backgroundImage: `url('${ serverUrl }/core/login/background')` }}
        className={"min-h-screen w-full bg-center bg-no-repeat animate__animated animate__fadeIn animate__1s"}
      >
        {
          selectedUser
            ? (
              <LoginAsUser
                name={name}
                serverUrl={serverUrl}
                username={selectedUser}
              />
            )
            : (
              <SelectUser
                setName={value => setName( value )}
                serverUrl={serverUrl}
                setSelectedUser={username => setSelectedUser( username )}
              />
            )
        }
        <Card className={"absolute left-2 bottom-2"}>
          <Card onClick={() => 0}>
            <span>username</span>
          </Card>
        </Card>
      </main>
    </>
  );
};

export default ServerLoginPage;
