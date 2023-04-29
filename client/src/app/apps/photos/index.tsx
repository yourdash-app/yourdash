import React, { useState } from "react"
import { Card, Icon, IconButton } from "../../../ui"
import PhotoDay from "./components/photoDay"

const PhotosApplication: React.FC = () => {
  const [photos, setPhotos] = useState<{ photos: ""[], date: string }[]>( [
    {
      date: "fame",
      photos: []
    },
    {
      date: "dish",
      photos: []
    },
    {
      date: "tea",
      photos: []
    },
    {
      date: "flavor",
      photos: []
    },
    {
      date: "intend",
      photos: []
    }
  ] )

  return (
    <div className={ "grid grid-rows-[auto,1fr]" }>
      <div className={ "pt-4 pb-4 pl-4 text-base-50 font-semibold text-3xl bg-container-bg" }>
        <h2>
          Photos
        </h2>
      </div>
      <main className={ "p-2 flex flex-col" }>
        {
          photos.map( photoCategory => <PhotoDay photoCategory={ photoCategory }/> )
        }
      </main>
    </div>
  )
}

export default PhotosApplication
