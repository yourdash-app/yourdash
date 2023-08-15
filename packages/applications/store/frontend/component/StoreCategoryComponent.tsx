import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "web-client/src/ui";
import PLACEHOLDER_BACKGROUND from "./background.svg";
import styles from "./StoreCategoryComponent.module.scss";

export interface IStoreCategoryComponent {
  id: string;
}

const StoreCategoryComponent: React.FC<IStoreCategoryComponent> = ( {
  id
} ) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate( `/app/a/store/cat/${ id }` )}
      className={styles.component}
    >
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${ PLACEHOLDER_BACKGROUND })`
        }}
      />
      <div className={styles.gradient}/>
      <span className={styles.label}>
        {id.slice( 0, 1 ).toUpperCase() + id.slice( 1 )}
      </span>
    </Card>
  );
};

export default StoreCategoryComponent;
