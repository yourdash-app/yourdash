import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../../ui";
import csi from "../../../../helpers/csi";
import styles from "./StoreApplicationComponent.module.scss";

export interface IStoreApplicationComponent {
  displayName: string;
  id: string;
  icon: string;
}

const StoreApplicationComponent: React.FC<IStoreApplicationComponent> = ( {
  displayName,
  id,
  icon
} ) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate( `/app/a/store/app/${ id }` )}
      className={styles.component}
    >
      <img loading={"lazy"} src={`${ csi.getInstanceUrl() }${ icon }`} className={"aspect-square h-16"} alt={""}/>
      <div className={styles.section}>
        <span className={styles.label}>
          {displayName}
        </span>
      </div>
    </Card>
  );
};

export default StoreApplicationComponent;
