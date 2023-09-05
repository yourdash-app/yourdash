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

import React, { useEffect } from "react"
import { Outlet } from "react-router"
import Panel from "./Panel";
import clippy from "../../helpers/clippy";
import styles from "./PanelLayout.module.scss"
import csi from "../../helpers/csi";

const PanelLayout: React.FC = () => {
  const [panelSide, setPanelSide] = React.useState<"top" | "right" | "bottom" | "left">( csi.userDB.get( "core:panel:side" ) || "left" )
  const [reloadNumber, setReloadNumber] = React.useState<number>( 0 )
  
  useEffect( () => {
    setPanelSide( csi.userDB.get( "core:panel:side" ) || "left" )
  }, [reloadNumber] );
  
  switch ( panelSide ) {
  case "top":
    return <div className={clippy( styles.layout, styles.top )}>
      <Panel side={"top"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  case "left":
    return <div className={clippy( styles.layout, styles.left )}>
      <Panel side={"left"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  case "bottom":
    return <div className={clippy( styles.layout, styles.bottom )}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <Panel side={"bottom"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
    </div>
  case "right":
    return <div className={clippy( styles.layout, styles.right )}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <Panel side={"right"} setLayoutReloadNumber={( num ) => setReloadNumber( num )}/>
    </div>
  default:
    return <>An Unexpected Error Occurred</>
  }
}

export default PanelLayout
