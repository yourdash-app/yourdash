import React from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "../../../../ui";
import PLACEHOLDER_BACKGROUND from "./background.svg";

export interface IStoreCategoryComponent {
  id: string;
}

const StoreCategoryComponent: React.FC<IStoreCategoryComponent> = ({
  id
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/app/a/store/cat/${ id }`)}
      className={"p-4 pt-24 relative overflow-hidden group cursor-pointer"}
    >
      <div
        className={"absolute w-full h-full top-0 left-0 bg-center bg-cover opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:transition-[var(--transition-fast)] group-focus-visible:transition-[var(--transition-fast)] transition-[var(--transition)]"}
        style={{
          backgroundImage: `url(${ PLACEHOLDER_BACKGROUND })`
        }}
      />
      <div className={"absolute w-full h-full top-0 left-0 to-[#000000aa] from-transparent bg-gradient-to-b"}/>
      <span className={"text-5xl group-hover:scale-105 group-focus-visible:scale-105 origin-bottom-left font-bold tracking-wide absolute left-4 bottom-4 transition-[var(--transition)] group-hover:transition-[var(--transition-fast)] group-focus-visible:transition-[var(--transition-fast)]"}>
        {id.slice(0, 1).toUpperCase() + id.slice(1)}
      </span>
    </Card>
  );
};

export default StoreCategoryComponent;
