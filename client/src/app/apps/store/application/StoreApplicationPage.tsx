import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IconButton, Spinner, Card, Button } from "../../../../ui"
import csi from "../../../../helpers/csi"
import { IYourDashApplication } from "../../../../../../shared/core/application"

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
    <div className={ "grid grid-rows-[auto,1fr] h-full" }>
      <header className={ "bg-container-bg text-container-fg border-b-[1px] border-b-container-border p-2 pr-4 flex gap-2" }>
        <IconButton
          icon={ "arrow-left-16" }
          onClick={ () => {
            navigate( `/app/a/store/cat/${appData?.category}` )
          } }
        />
        <h1 className={ "text-3xl font-semibold tracking-wide" }>YourDash Store | { appData?.displayName }</h1>
      </header>
      <main>
        {
          isLoading
            ? (
              <div className={ "w-full h-full flex items-center justify-center" }>
                <Spinner/>
              </div>
            )
            : appData && (
              <>
                <header className={ "flex flex-col w-full bg-container-bg gap-4" }>
                  <img className={ "w-full h-64 aspect-square select-none" } src={ appData.icon } draggable={ false } alt=""/>
                  <section className={ "flex items-center p-4 gap-4 max-w-[50rem] w-full ml-auto mr-auto" }>
                    <img className={ "w-24 aspect-square select-none" } src={ appData.icon } draggable={ false } alt=""/>
                    <h1 className={ "text-4xl font-semibold tracking-wide mr-auto" }>{ appData.displayName }</h1>
                    <div className={ "flex gap-2" }>
                      <Button>Install</Button>
                      <IconButton icon={ "link-external-16" }/>
                    </div>
                  </section>
                </header>
                <main className={ "p-4 flex flex-col gap-2 max-w-[50rem] w-full ml-auto mr-auto" }>
                  <Card>
                    { appData.description }
                  </Card>
                  <Card>
                    <div>Category: { appData.category }</div>
                    <div>ID: { appData.name }</div>
                  </Card>
                </main>
              </>
            )
        }
      </main>
    </div>
  )
}

export default StoreApplicationPage
