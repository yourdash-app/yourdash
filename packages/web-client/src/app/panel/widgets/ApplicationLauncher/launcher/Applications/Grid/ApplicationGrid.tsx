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

import IPanelApplicationsLauncherApplication from "shared/core/panel/applicationsLauncher/application";
import styles from "./ApplicationGrid.module.scss"
import { useNavigate } from "react-router";

const ApplicationGrid: React.FC<{ applications: IPanelApplicationsLauncherApplication[] }> = ( { applications } ) => {
  const navigate = useNavigate()
  
  return <section className={styles.grid}>
    {
      applications.map( application => {
        return <div
          className={styles.item}
          key={application.name}
          onClick={() => {
            navigate( `/app/a/${application.name}` )
          }}
        >
          <img
            className={styles.itemIcon}
            src={application.icon}
            alt=""
          />
          <span
            className={styles.itemLabel}
          >
            {application.name}
          </span>
        </div>
      } )
    }
  </section>
}

export default ApplicationGrid;