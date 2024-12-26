/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import UKCard from "../../components/card/UKCard.tsx";
import styles from "./dialog.module.scss";

const UKDialog: React.FC<{ children: React.ReactNode | React.ReactNode[]; className?: string }> = ({ children, className }) => {
  return (
    <div className={styles.background}>
      <UKCard
        containerClassName={styles.view}
        className={className}
      >
        {children}
      </UKCard>
    </div>
  );
};

export default UKDialog;
