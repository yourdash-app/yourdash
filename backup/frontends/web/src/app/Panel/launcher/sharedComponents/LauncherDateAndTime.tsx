import React, { useEffect, useRef, useState } from "react"
import { useBeforeUnload } from "react-router-dom"

const LauncherDateAndTime: React.FC = () => {
  const [date, setDate] = useState( new Date() )

  const interval = useRef<NodeJS.Timer | null>( null )

  useEffect( () => {
    interval.current = setInterval( () => {
      setDate( new Date() )
    }, 60000 )
  }, [] )

  useBeforeUnload( () => {
    if ( interval.current ) {
      clearInterval( interval.current )
    }
  } )

  return <span className={ "pl-1" }>{ date.toDateString() }</span>
}

export default LauncherDateAndTime
