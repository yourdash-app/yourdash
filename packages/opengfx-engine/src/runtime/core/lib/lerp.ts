/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default function lerp( a: number, b: number, t: number ): number {
  return a * ( 1 - t ) + b * t
}

export function lerpPropertyOverTime( a: number, b: number, duration: number, setProperty: ( val: number ) => void ) {
  const startTime = Date.now()
  
  const interval = () => {
    const t = Math.min( 1, ( Date.now() - startTime ) / duration )
    setProperty( lerp( a, b, t ) )

    if ( t < 1 ) {
      requestAnimationFrame( interval )
    }
  }

  requestAnimationFrame( interval )
}
