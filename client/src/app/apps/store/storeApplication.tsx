import React, { useEffect, useState } from "react"
import { PromotedApplication } from "../../../../../shared/apps/store/promotedApplication"
import csi from "../../../helpers/csi"
import { Card, Carousel, MajorButton } from "../../../ui"

const StoreApplication: React.FC = () => {
  const [promotedApplications, setPromotedApplications] = useState<PromotedApplication[]>( [] )
  const [categories, setCategories] = useState<string[]>( [] )

  useEffect( () => {
    csi.getJson( "/app/store/promoted/applications", data => {
      setPromotedApplications( data )
    } )

    csi.getJson( "/app/store/categories", data => {
      setCategories( data )
    } )
  }, [] )

  return (
    <main>
      <header className={ "w-full flex flex-col items-center justify-center pt-2 pb-4 bg-container-bg bg-opacity-40 backdrop-blur-lg" }>
        <h2 className={ "text-3xl font-semibold tracking-wide pt-1 pb-3" }>YourDash Store</h2>
        <Carousel containerClassName={ "max-w-4xl w-full" }>
          {
            promotedApplications.map( item => {
              return (
                <div key={ item.name } className={ "w-full h-full" }>
                  <div className={ "w-[calc(100%-7rem)] h-full relative ml-auto mr-auto overflow-hidden rounded-2xl" }>
                    <img src={ item.backgroundImage } className={ "w-full h-full absolute top-0 left-0" } alt=""/>
                    <div className={ "w-full pt-3 pb-3 pl-12 pr-12 flex items-center bg-container-bg bg-opacity-75 backdrop-blur-md bottom-0 absolute rounded-b-2xl overflow-hidden" }>
                      <img className={ "h-12 aspect-square" } src={ item.icon } alt=""/>
                      <span className={ "mr-auto pl-2 text-lg" }>{ item.displayName }</span>
                      <MajorButton disabled={ item.installed } className={ "h-max" }>{ item.installed ? "Installed" : "Install" }</MajorButton>
                    </div>
                  </div>
                </div>
              )
            } )
          }
        </Carousel>
      </header>
      <section className={ "p-4 grid grid-cols-5 gap-2" }>
        {
          categories.map( category => {
            return <Card key={ category }>{category}</Card>
          } )
        }
      </section>
    </main>
  )
}

export default StoreApplication
