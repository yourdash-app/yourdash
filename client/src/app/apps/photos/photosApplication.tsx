import React, { useEffect, useState } from "react"
import { Icon, MajorButton } from "../../../ui"
import PhotoDay from "./components/photoDay"

const PhotosApplication: React.FC = () => {
  const [photoCategories, setPhotoCategories] = useState<{ photos: ""[], date: string }[]>( [] )

  useEffect( () => {
    setPhotoCategories( [] )
  }, [] )

  return (
    <div className={ "grid grid-rows-[auto,1fr] h-full" }>
      <div className={ "pt-4 pb-4 pl-4 text-base-50 font-semibold text-3xl bg-container-bg" }>
        <h2>
          Photos
        </h2>
      </div>
      <main className={ "p-2 flex flex-col h-full" }>
        {
          photoCategories.length !== 0
            ? photoCategories.map( photoCategory => {
              return <PhotoDay key={ photoCategory.date } photoCategory={ photoCategory }/>
            } )
            : (
              <main className={ "min-h-full w-full flex items-center justify-center flex-col gap-2" }>
                <span className={ "font-semibold text-3xl tracking-wide" }>😥 You have no photos</span>
                <MajorButton className={ "flex gap-1 items-center justify-center pl-2 pr-2" }>
                  <Icon className={ "h-full" } name={ "upload-16" }/>
                  <span className={ "block flex-nowrap whitespace-nowrap" }>
                    Upload photos
                  </span>
                </MajorButton>
              </main>
            )
        }
      </main>
    </div>
  )
}

export default PhotosApplication
