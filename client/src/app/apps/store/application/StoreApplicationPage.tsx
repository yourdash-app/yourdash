import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IconButton, Spinner, Card, Button, Icon, Badge, DateInput } from "../../../../ui"
import csi from "../../../../helpers/csi"
import { IYourDashApplication } from "../../../../../../shared/core/application"
import StoreApplicationDefaultHeaderBackground from "./default_background.png"

interface IYourDashApplicationStorePage extends IYourDashApplication {
  icon: string
}

const StoreApplicationPage: React.FC = () => {
  const navigate = useNavigate()
  const { id: applicationId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>( true )
  const [appData, setAppData] = useState<IYourDashApplicationStorePage>()

  useEffect( () => {
    csi.getJson(
      `/app/store/application/${ applicationId }`,
      data => {
        setAppData( data )
        setIsLoading( false )
      },
      () => {
        navigate( "/app/a/store" )
      }
    )
  }, [applicationId, navigate] )

  if ( !applicationId ) {
    navigate( "/app/a/store" )
    return null
  }

  return (
    <div className={ "h-full relative" }>
      <IconButton
        className={ "absolute left-4 top-4 z-10" }
        icon={ "arrow-left-16" }
        onClick={ () => {
          navigate( `/app/a/store/cat/${ appData?.category }` )
        } }
      />
      <main>
        {
          isLoading
            ? (
              <div className={ "w-full h-full flex items-center justify-center" }>
                <Spinner/>
                TODO: add a back button
              </div>
            )
            : appData && (
              <>
                <header className={ "flex flex-col w-full bg-container-bg" }>
                  <div className="h-64 relative">
                    <img className={ "w-full h-64" } src={ StoreApplicationDefaultHeaderBackground } alt=""/>
                    <div className={ "flex items-center justify-center flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-3" }>
                      <img className={ "w-24 aspect-square select-none" } src={ appData.icon } draggable={ false } alt=""/>
                      <h1 className={ "text-5xl tracking-wider font-black" }>{ appData.displayName }</h1>
                    </div>
                  </div>
                  <section className={ "flex items-center p-4 gap-4 max-w-[50rem] w-full ml-auto mr-auto" }>
                    <img className={ "w-24 aspect-square select-none" } src={ appData.icon } draggable={ false } alt=""/>
                    <h1 className={ "text-4xl font-semibold tracking-wide mr-auto" }>{ appData.displayName }</h1>
                    <div className={ "flex gap-2" }>
                      <Button>Install</Button>
                    </div>
                  </section>
                </header>
                <main className={ "p-4 flex flex-col gap-2 max-w-[50rem] w-full ml-auto mr-auto" }>
                  <Card>
                    { appData.description }
                  </Card>
                  <Card className={ "flex flex-col" }>
                    <div>Category: { appData.category }</div>
                    <div>ID: { appData.name }</div>
                    <br/>
                    <div>Created as part of the YourDash Project</div>
                  </Card>
                  <h2 className={ "text-2xl font-medium" }>Source Code</h2>
                  <section className={ "grid grid-cols-2 gap-2" }>
                    <Card
                      onClick={ () => {
                        window.open( `https://github.com/yourdash-app/yourdash/tree/main/client/src/app/apps/${ appData.name }` )
                      } }
                      className={ "flex gap-1 items-center" }
                    >
                      <Icon className={ "h-5" } name={ "link-16" }/>
                      <span>
                        Client
                      </span>
                    </Card>
                    <Card
                      onClick={ () => {
                        window.open( `https://github.com/yourdash-app/yourdash/tree/main/server/src/apps/${ appData.name }` )
                      } }
                      className={ "flex gap-1 items-center" }
                    >
                      <Icon className={ "h-5" } name={ "link-16" }/>
                      <span>Server</span>
                    </Card>
                  </section>
                </main>
              </>
            )
        }
      </main>
    </div>
  )
}

export default StoreApplicationPage
