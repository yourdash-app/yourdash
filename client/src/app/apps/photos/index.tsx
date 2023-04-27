import React, { useState } from "react"

const PhotosApplication: React.FC = () => {
  const [photos, setPhotos] = useState<{ photos: ""[], date: string }[]>( [] )

  return (
    <div className={ "grid grid-rows-[auto,1fr]" }>
      <header>
        <h2>Photos</h2>
      </header>
      <main>
        {
          photos.map( photoCat => (
            <div>
              <span>{ photoCat.date }</span>
            </div>
          ) )
        }
      </main>
    </div>
  )
}

export default PhotosApplication
