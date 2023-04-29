import React, { useState } from "react"
import { Card, Icon } from "../../../../ui"

const PhotoDay: React.FC<{ photoCategory: { date: string, photos: string[] } }> = ( { photoCategory } ) => {
  const [isOpen, setIsOpen] = useState<boolean>( true )

  return (
    <div key={ photoCategory.date } className={ "flex flex-col gap-1" }>
      <button
        onClick={ () => {
          setIsOpen( !isOpen )
        } }
        type={ "button" }
        className={ "text-left border-b-[1px] border-b-container-border pt-2.5 pb-0.5 pl-2 ml-2.5 mr-2.5 flex" +
                    " justify-between" +
                    " text-xl" }
      >
        <h3>
          { photoCategory.date }
        </h3>
        <Icon
          name={ isOpen ? "chevron-down-16" : "chevron-up-16" }
          className={ "h-5" }
          color={ "rgb(var(--button-fg))" }
        />
      </button>
      {
        isOpen && (
          <Card>
            {
              photoCategory.photos.map( photo => <img src={ photo } key={ photo } alt={ "" }/> )
            }
          </Card>
        )
      }
    </div>
  )
}

export default PhotoDay
