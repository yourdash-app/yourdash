/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useEffect } from "react";
import { useTranslateHomePage } from "../../../../helpers/i10n";

const IndexPageHeroTaglines: React.FC = () => {
  const trans = useTranslateHomePage( "index" )
  const [taglineIndex, setTaglineIndex] = React.useState<number>( 0 )

  useEffect( () => {
    setTimeout( () => {
      if ( ( taglineIndex + 1 ) >= 3 ) {
        setTaglineIndex( 0 )
        return
      }
      setTaglineIndex( taglineIndex + 1 )
    }, 2500 )
  }, [taglineIndex] );

  return   <div
    className={ "relative whitespace-nowrap w-full animate__animated animate__slideInRight animate__500ms" }
  >
    <span
      className={ "absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500" }
      style={ {
        right: taglineIndex === 0 ? 0 : "-100%",
        opacity: taglineIndex === 0 ? 1 : 0,
        scale: taglineIndex === 0 ? "100%" : "0%"
      } }
    >
      { trans( "TAGLINES.0" ) }
    </span>
    <span
      className={ "absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500" }
      style={ {
        right: taglineIndex === 1 ? 0 : "-100%",
        opacity: taglineIndex === 1 ? 1 : 0,
        scale: taglineIndex === 1 ? "100%" : "0%"
      } }
    >
      { trans( "TAGLINES.1" ) }
    </span>
    <span
      className={ "absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500" }
      style={ {
        right: taglineIndex === 2 ? 0 : "-100%",
        opacity: taglineIndex === 2 ? 1 : 0,
        scale: taglineIndex === 2 ? "100%" : "0%"
      } }
    >
      { trans( "TAGLINES.2" ) }
    </span>
  </div>
}

export default IndexPageHeroTaglines