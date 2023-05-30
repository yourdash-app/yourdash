import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import csi from "../../../../helpers/csi"
import { type IStoreCategory } from "../../../../../../shared/apps/store/storeCategory"
import { Spinner, Card, IconButton } from "../../../../ui"

const StoreCategoryPage: React.FC = () => {
  const navigate = useNavigate()
  const { id: categoryId } = useParams()
  const [categoryData, setCategoryData] = useState<IStoreCategory>()
  const [isLoading, setIsLoading] = useState<boolean>( true )

  useEffect( () => {
    csi.getJson(
      `/app/store/category/${ categoryId }`,
      data => {
        setCategoryData( data )
        setIsLoading( false )
      },
      () => {
        navigate( "/app/a/store" )
      }
    )
  }, [categoryId, navigate] )

  if ( !categoryId ) {
    navigate( "/app/a/store" )
    return null
  }

  return (
    <div className={ "grid grid-rows-[auto,1fr] h-full" }>
      <header className={ "bg-container-bg text-container-fg border-b-[1px] border-b-container-border p-2 pr-4 flex gap-2" }>
        <IconButton
          icon={ "arrow-left-16" }
          onClick={ () => {
            navigate( "/app/a/store/" )
          } }
        />
        <h1 className={ "text-3xl font-semibold tracking-wide" }>YourDash Store | { categoryData?.displayName }</h1>
      </header>
      <main>
        {
          isLoading
            ? (
              <div className={ "w-full h-full flex items-center justify-center" }>
                <Spinner/>
              </div>
            )
            : (
              <div className={ "w-full max-h-full grid grid-cols-3 gap-4 p-8" }>
                {
                  categoryData && categoryData.applications.map( application => {
                    return (
                      <Card
                        key={ application.name }
                        className={ "flex items-center gap-2 text-2xl font-semibold tracking-wide" }
                        onClick={ () => {
                          return navigate( `/app/a/store/app/${ application.name }` )
                        } }
                      >
                        <img alt={ "" } src={ application.icon } className={ "h-16 aspect-square" }/>
                        <span>{ application.displayName }</span>
                      </Card>
                    )
                  } )
                }
              </div>
            )
        }
      </main>
    </div>
  )
}

export default StoreCategoryPage
