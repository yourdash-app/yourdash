import React from "react";
import {IconButton} from "../../../../ui";
import {useNavigate} from "react-router-dom";

export interface IBasePageLayout {
  children: React.ReactNode,
  title: string,
  noBack?: boolean
}

const BasePageLayout: React.FC<IBasePageLayout> = ({
  children,
  title,
  noBack
}) => {
  const navigate = useNavigate();

  return (
    <main className={"flex flex-col items-center ml-auto mr-auto w-full max-w-6xl pl-4 pr-4"}>
      <section className={"flex items-center w-full gap-2 pt-8 pb-8 pl-4 pr-4"}>
        {
          !noBack && (
            <IconButton
              onClick={() => {
                navigate("..");
              }}
              icon={"chevron-left-16"}
            />
          )
        }
        <h1 className={"font-bold text-container-fg text-4xl w-full text-left"}>{title}</h1>
      </section>
      <div className={"grid grid-cols-1 w-full xl:grid-cols-2 gap-2"}>
        {children}
      </div>
    </main>
  );
};

export default BasePageLayout;
