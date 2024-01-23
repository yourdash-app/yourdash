/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "web-client/src/ui/index";
import PLACEHOLDER_BACKGROUND from "../background.svg";
import styles from "./StoreCategory.module.scss";

export interface IStoreCategoryComponent {
  id: string;
}

const StoreCategory: React.FC<IStoreCategoryComponent> = ( {
  id
} ) => {
  const navigate = useNavigate();

  return (
    <Card
      unStyledClickable={true}
      onClick={() => navigate( `/app/a/store/cat/${ id }` )}
      className={styles.component}
    >
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${ PLACEHOLDER_BACKGROUND })`
        }}
      />
      <span className={styles.label}>
        {id.slice( 0, 1 ).toUpperCase() + id.slice( 1 )}
      </span>
    </Card>
  );
};

export default StoreCategory;