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
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Spinner, Card, Button, Icon, MajorButton, Carousel } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import StoreApplicationDefaultHeaderBackground from "./default_background.svg";
import Panel from "web-client/src/app/Panel/Panel";
import useTranslate from "web-client/src/helpers/i10n";
import { type IYourDashStoreApplication } from "shared/apps/store/storeApplication";
import InstallationPopup from "./components/InstallationPopup";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

function requestApplication(
  applicationId: string,
  setAppData: ( data: IYourDashStoreApplication ) => void,
  setIsLoading: ( data: boolean ) => void,
  navigate: ( data: string ) => void
) {
  csi.getJson(
    `/app/store/application/${ applicationId }`,
    data => {
      setAppData( data );
      setIsLoading( false );
    },
    () => {
      navigate( "/app/a/store" );
    }
  );
}

const StoreApplicationPage: React.FC = () => {
  const trans = useTranslate( "store" );
  const navigate = useNavigate();
  const { id: applicationId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>( true );
  const [appData, setAppData] = useState<IYourDashStoreApplication>();
  const [showInstallationConfirmation, setShowInstallationConfirmation] = useState<boolean>( false );
  
  useEffect( () => {
    setShowInstallationConfirmation( false );
    setIsLoading( true );
    requestApplication( applicationId || "dash", data => setAppData( data ), setIsLoading, navigate );
  }, [applicationId, navigate] );
  
  if ( !applicationId ) {
    navigate( "/app/a/store" );
    return null;
  }
  
  return (
    <div className={"h-full relative"}>
      {showInstallationConfirmation && (
        <InstallationPopup
          applicationData={appData}
          onClose={() => setShowInstallationConfirmation( false )}
          onConfirm={() => {
            csi.postJson( `/app/store/application/install/${ appData?.name }`, {}, resp => {
              if ( resp.success ) {
                requestApplication( applicationId, setAppData, setIsLoading, navigate );
              }
              
              // @ts-ignore
              Panel.reload();
            } );
            setShowInstallationConfirmation( false );
          }}
        />
      )}
      {
        isLoading
          ? (
            <div className={"w-full h-full flex items-center justify-center"}>
              <Spinner/>
              {"TODO: add a back button"}
            </div>
          )
          : appData && (
            <>
              <header className={"flex flex-col w-full bg-container-bg"}>
                <div
                  style={{
                    backgroundImage: `url(${ StoreApplicationDefaultHeaderBackground })`
                  }}
                  className="sm:h-64 h-32 transition-all bg-cover bg-center flex select-none items-center justify-center flex-row gap-3 animate__animated animate__fadeIn"
                >
                  <img
                    className={"aspect-square drop-shadow-lg sm:w-24 w-0 transition-all"}
                    src={appData.icon}
                    draggable={false}
                    alt=""
                  />
                  <h1
                    className={"text-5xl tracking-wider font-black drop-shadow-lg w-max"}
                  >{appData.displayName}</h1>
                </div>
                <section
                  className={"flex items-center p-4 gap-4 max-w-[50rem] w-full ml-auto mr-auto animate__animated animate__fadeIn animate__250ms"}
                >
                  <IconButton
                    icon={YourDashIcon.ChevronLeft16}
                    onClick={() => {
                      navigate( `/app/a/store/cat/${ appData?.category }` );
                    }}
                  />
                  <img
                    className={"w-24 aspect-square select-none"}
                    src={appData.icon}
                    draggable={false}
                    alt=""
                  />
                  <h1 className={"text-4xl font-semibold tracking-wide mr-auto"}>
                    {appData.displayName}
                  </h1>
                  <div className={"flex gap-2"}>
                    {
                      appData.installed && (
                        <MajorButton
                          onClick={() => {
                            navigate( `/app/a/${ appData.name }` );
                          }}
                        >
                          {
                            trans( "OPEN_APPLICATION" )
                          }
                        </MajorButton>
                      )}
                    <Button onClick={() => {
                      if ( appData.installed ) {
                        csi.postJson( `/app/store/application/uninstall/${ appData.name }`, {}, resp => {
                          if ( resp.success ) {
                            requestApplication( applicationId, setAppData, setIsLoading, navigate );
                          }
                        
                          // @ts-ignore
                          Panel.reload();
                        } );
                      } else {
                        setShowInstallationConfirmation( true );
                      }
                    }}
                    >
                      {
                        appData.installed ? trans( "UNINSTALL" ) : trans( "INSTALL" )
                      }
                    </Button>
                  </div>
                </section>
              </header>
              <main
                className={"p-4 flex flex-col gap-2 max-w-[50rem] w-full ml-auto mr-auto animate__500ms animate__animated animate__fadeIn"}
              >
                <Card>
                  {appData.description}
                </Card>
                <h2 className={"text-2xl font-medium"}>{trans( "ABOUT_SECTION" )}</h2>
                <Card className={"flex flex-col items-start"}>
                  <div>
                    {
                      `Category: ${ appData.category }`
                    }
                  </div>
                  <div>
                    {
                      `ID: ${ appData.name }`
                    }
                  </div>
                  <br/>
                  <div>
                    {
                      "Created as part of the YourDash Project"
                    }
                  </div>
                </Card>
                <h2 className={"text-2xl font-medium"}>{trans( "SOURCE_CODE_SECTION" )}</h2>
                <section className={"grid grid-cols-2 gap-2"}>
                  <Card
                    onClick={() => {
                      window.open(
                        `https://github.com/yourdash-app/yourdash/tree/main/client/src/app/apps/${ appData.name }`
                      );
                    }}
                    className={"flex gap-1 items-center"}
                  >
                    <Icon className={"h-5"} icon={YourDashIcon.Link16}/>
                    <span>
                      {
                        "Client"
                      }
                    </span>
                  </Card>
                  <Card
                    onClick={() => {
                      window.open(
                        `https://github.com/yourdash-app/yourdash/tree/main/server/src/apps/${ appData.name }`
                      );
                    }}
                    className={"flex gap-1 items-center"}
                  >
                    <Icon className={"h-5"} icon={YourDashIcon.Link16}/>
                    <span>
                      {
                        "Server"
                      }
                    </span>
                  </Card>
                </section>
                <h2 className={"text-2xl font-medium"}>{trans( "AUTHORS_SECTION" )}</h2>
                <section className={"w-full"}>
                  <Carousel>
                    {
                      appData.authors?.map( author => (
                        <Card key={author.avatarUrl} className={"flex flex-col gap-2"}>
                          <img className={"h-32 aspect-square rounded-container-rounding"} src={author.avatarUrl} alt={author.avatarUrl}/>
                          <div className={"flex items-center justify-between gap-2"}>
                            <span>{author.displayName}</span>
                            {
                              author.site && (
                                <IconButton
                                  onClick={() => {
                                    window.location.href = author.site;
                                  }}
                                  icon={YourDashIcon.Link16}
                                />
                              )
                            }
                          </div>
                        </Card>
                      ) )
                    }
                  </Carousel>
                </section>
              </main>
            </>
          )
      }
    </div>
  );
};

export default StoreApplicationPage;
