/*
 * Copyright © 2023 @Ewsgit and YourDash contributors.
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

import styles from "./Panel.module.scss"
import clippy from "../../helpers/clippy";
import { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { YourDashIcon, IconButton } from "../../ui/index";
import csi from "../../helpers/csi";

const Panel: React.FC<{ side: "top" | "right" | "bottom" | "left", setLayoutReloadNumber: ( num: number ) => void }> = ( { side, setLayoutReloadNumber } ) => {
  const [widgets, setWidgets] = useState<string[]>( ["InstanceLogo", "ApplicationLauncher", "Separator", "QuickShortcuts"] )
  const [panelSize, setPanelSize] = useState<"small" | "medium" | "large">( "medium" )
  const [num, setNum] = useState<number>( 0 )
  
  useEffect( () => {
    setPanelSize( csi.userDB.get( "core:panel:size" ) || "medium" )
  }, [num] );
  
  // @ts-ignore
  window.__yourdashCorePanelReload = () => {
    setNum( num + 1 )
    setLayoutReloadNumber( num + 1 )
  }
  
  return <section className={clippy(
    styles.panel,
    side === "top" && styles.top,
    side === "right" && styles.right,
    side === "bottom" && styles.bottom,
    side === "left" && styles.left,
    panelSize === "small" && styles.small,
    panelSize === "medium" && styles.medium,
    panelSize === "large" && styles.large
  )}>
    {
      widgets.map( widget => {
        const LoadableWidget = loadable( () => import( `./widgets/${widget}/Widget` ) )
        
        return <LoadableWidget key={widget} side={side} />
      } )
    }
  </section>
}

export default Panel