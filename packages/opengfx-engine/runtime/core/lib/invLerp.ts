/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default function invLerp( a: number, b: number, t: number ): number {
  return ( b - a ) * ( 1 - t ) + a
}

export function invLerpPropertyOverTime( a: number, b: number, duration: number, setProperty: ( val: number ) => void ) {
  const startTime = Date.now()
  
  const interval = () => {
    const t = Math.min( 1, ( Date.now() - startTime ) / duration )
    setProperty( invLerp( a, b, t ) )
    
    if ( t < 1 ) {
      requestAnimationFrame( interval )
    }
  }
  
  requestAnimationFrame( interval )
}
