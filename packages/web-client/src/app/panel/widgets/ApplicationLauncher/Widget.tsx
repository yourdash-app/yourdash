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

import React, { useEffect } from "react";
import { IconButton, YourDashIcon } from "../../../../ui/index";
import styles from "./Widget.module.scss"
import ApplicationLauncher from "./launcher/Launcher";
import { useLocation } from "react-router";

const ApplicationLauncherWidget: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ( { side } ) => {
  const [launcherVisible, setLauncherVisible] = React.useState<boolean>( false )
  const location = useLocation()
  
  useEffect( () => {
    setLauncherVisible( false )
  }, [location] );
  
  return <div className={styles.widgetContainer}>
    <IconButton
      icon={YourDashIcon.Apps}
      className={styles.launcherButton}
      onClick={() => setLauncherVisible( !launcherVisible )}
    />
    <ApplicationLauncher side={side} visible={launcherVisible} />
  </div>
}

export default ApplicationLauncherWidget;