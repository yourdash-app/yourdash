/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import React from "react";

interface IKeyPointsCard {
  title: string;
  content: string;
  action: {
    label: string;
    onClick(): void;
  };
  spanTwoColumns?: boolean;
}

const KeyPointsCard: React.FC<IKeyPointsCard> = ({ title, content, action }) => {
  return (
    <UKCard
      actions={
        <>
          <UKButton
            onClick={action.onClick}
            text={action.label}
          />
        </>
      }
    >
      <UKHeading
        level={2}
        text={title}
        className={"!text-4xl font-semibold !text-start pt-4"}
      />
      <UKText
        className={"text-start"}
        text={content}
      />
    </UKCard>
  );
};

export default KeyPointsCard;
