/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Icon, YourDashIcon } from "web-client/src/ui/index";
import styles from "./CreateDashWidget.module.scss"

const CreateDashWidget: React.FC = () => {
  return <div className={styles.component}>
    <Icon
      className={styles.icon}
      icon={YourDashIcon.Plus}
    />
    <div
      className={styles.label}
    >
      Add widget
    </div>
  </div>
}

export default CreateDashWidget
