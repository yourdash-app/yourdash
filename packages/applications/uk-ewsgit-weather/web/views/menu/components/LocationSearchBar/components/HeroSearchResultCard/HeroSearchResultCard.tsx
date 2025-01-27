/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/chiplet/components/card/Card";
import React from "react";
import { ILocationSearchResult } from "../../../../../../../shared/locationSearchResult";
import { useNavigate } from "react-router-dom";
import CLOUDY_BACKGROUND from "../../../../../../assets/weatherBackgrounds/cloudy1.jpg";
import styles from "./HeroSearchResultCard.module.scss";

const HeroSearchResultCard: React.FC<{ props: ILocationSearchResult }> = ({ props }) => {
  const navigate = useNavigate();

  return (
    <Card
      showBorder={true}
      style={{
        background: `url(${CLOUDY_BACKGROUND})`,
      }}
      className={clippy("animate__animated animate__fadeIn", styles.component)}
      onClick={() => {
        navigate(`/app/a/uk-ewsgit-weather/${props.id}`);
      }}
    >
      <h2 className={"text-4xl font-bold tracking-wide"}>
        {props.address.name}
        {props.address.country !== props.address.name && ","}
      </h2>
      <span>{props.address.admin1 && `${props.address.admin1}, `}</span>
      <span>{props.address.country !== props.address.name && props.address.country}</span>
    </Card>
  );
};

export default HeroSearchResultCard;
