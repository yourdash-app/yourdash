/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "web-client/src/helpers/clippy";
import { Card } from "web-client/src/ui/index";
import { ILocationSearchResult } from "../../../../../shared/locationSearchResult";
import { useNavigate } from "react-router-dom";

const SavedLocationCard: React.FC<{ props: ILocationSearchResult }> = ( { props } ) => {
  const navigate = useNavigate()

  return <Card
    showBorder={true}
    className={
      clippy(
        "animate__animated animate__fadeIn",
        "hover:bg-button-hover-bg active:bg-button-active-bg hover:text-button-hover-fg active:text-button-active-fg transition-[var(--transition)] cursor-pointer w-full bg-button-bg text-button-fg"
      )
    }
    onClick={() => {
      navigate( `/app/a/weather/${ props.id }` );
    }}
  >
    <h2 className={"text-2xl font-semibold tracking-wide"}>{props.address.name}{props.address.country !== props.address.name && ","}</h2>
    <span>{props.address.admin1 && `${ props.address.admin1 }, `}</span>
    <span>{props.address.country !== props.address.name && props.address.country}</span>
  </Card>
}

export default SavedLocationCard
