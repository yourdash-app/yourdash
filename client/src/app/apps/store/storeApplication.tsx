import React, { useEffect, useState } from "react"
import { PromotedApplication } from "../../../../../shared/apps/store/promotedApplication"
import csi from "../../../helpers/csi"
import { Carousel, MajorButton } from "../../../ui"

const StoreApplication: React.FC = () => {
  const [promotedApplications, setPromotedApplications] = useState<PromotedApplication[]>( [] )

  useEffect( () => {
    csi.getJson( "/app/store/promoted/applications", data => {
      setPromotedApplications( data )
    } )
  }, [] )

  return (
    <main>
      <header className={ "w-full flex flex-col items-center justify-center pt-2 pb-4 bg-container-bg bg-opacity-40 backdrop-blur-lg" }>
        <h2 className={ "text-3xl font-semibold tracking-wide pt-1 pb-3" }>YourDash Store</h2>
        <Carousel containerClassName={ "max-w-4xl w-full" }>
          {
            promotedApplications.map( item => (
              <div key={ item.name } className={ "w-full h-full" }>
                <div className={ "w-[calc(100%-7rem)] h-full relative ml-auto mr-auto overflow-hidden rounded-2xl" }>
                  <img src={ item.backgroundImage } className={ "w-full h-full absolute top-0 left-0" } alt=""/>
                  <div className={ "w-full pt-3 pb-3 pl-6 pr-6 flex items-center bg-container-bg bg-opacity-75 backdrop-blur-md bottom-0 absolute rounded-b-2xl overflow-hidden" }>
                    <img className={ "h-12 aspect-square" } src={ item.icon } alt=""/>
                    <span className={ "mr-auto pl-2 text-lg" }>{ item.displayName }</span>
                    <MajorButton className={ "h-max" }>Install</MajorButton>
                  </div>
                </div>
              </div>
            ) )
          }
        </Carousel>
      </header>
      Store Application
    </main>
  )
}

export default StoreApplication
