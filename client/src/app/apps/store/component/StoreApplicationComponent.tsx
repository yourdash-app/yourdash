import React from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "../../../../ui";
import PLACEHOLDER_BACKGROUND from "./background.svg";
import csi from "../../../../helpers/csi";

export interface IStoreApplicationComponent {
  displayName: string;
  id: string;
  icon: string;
}

const StoreApplicationComponent: React.FC<IStoreApplicationComponent> = ({
  displayName,
  id,
  icon
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/app/a/store/app/${ id }`)}
      className={"p-4 relative overflow-hidden group cursor-pointer flex gap-4"}
    >
      <img loading={"lazy"} src={`${ csi.getInstanceUrl() }${ icon }`} className={"aspect-square h-16"} alt={""}/>
      <div className={"flex flex-col gap-1"}>
        <span className={"text-4xl font-bold tracking-wide"}>
          {displayName}
        </span>
      </div>
    </Card>
  );
};

export default StoreApplicationComponent;
