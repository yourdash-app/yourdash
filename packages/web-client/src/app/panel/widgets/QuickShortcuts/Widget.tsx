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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clippy from "../../../../helpers/clippy";
import csi from "../../../../helpers/csi";
import styles from "./Widget.module.scss";

const QuickShortcuts: React.FC<{side: "top" | "right" | "bottom" | "left" }> = ( { side } ) => {
  const navigate = useNavigate()
  
  const [applications, setApplications] = useState<{
    name: string,
    icon: string
  }[]>( [] );
  
  useEffect( () => {
    csi.getJson( "/core/panel/quick-shortcuts", ( data ) => {
      setApplications( data );
    } );
  }, [] );
  
  return <>
    {
      applications.map( application => {
        return <div
          key={ application.name }
          onClick={() => {
            navigate( `/app/a/${application.name}` )
          }}
          className={clippy(
            styles.application,
            side === "top" && styles.top,
            side === "right" && styles.right,
            side === "bottom" && styles.bottom,
            side === "left" && styles.left
          ) }
        >
          <img
            className={styles.applicationIcon}
            src={ `${ csi.getInstanceUrl() }${application.icon}` }
            alt={ "" }
          />
          <span
            className={styles.applicationLabel}
          >
            { application.name }
          </span>
        </div>;
      } )
    }
  </>
};

export default QuickShortcuts;