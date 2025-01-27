/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import UKCard from "../../components/card/UKCard.tsx";
import styles from "./dialog.module.scss";

const UKDialog: React.FC<{
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  actionsClassName?: string;
  headerClassName?: string;
  actions?: React.ReactNode | React.ReactNode[];
  header?: React.ReactNode | React.ReactNode[];
}> = ({ children, className, actionsClassName, headerClassName, actions, header }) => {
  return (
    <div className={styles.background}>
      <UKCard
        containerClassName={styles.view}
        actionsClassName={actionsClassName}
        headerClassName={headerClassName}
        actions={actions}
        header={header}
        className={className}
      >
        {children}
      </UKCard>
    </div>
  );
};

export default UKDialog;
