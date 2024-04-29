/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/uikit/components/button/button.js";
import Card from "@yourdash/uikit/components/card/card.js";

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
    <Card
      actions={
        <>
          <Button
            onClick={action.onClick}
            text={action.label}
          />
        </>
      }
    >
      <h3 className={"text-4xl text-center font-semibold"}>{title}</h3>
      <div className={"flex items-end gap-4 flex-col"}>
        <span className={"text-2xl text-center"}>{content}</span>
      </div>
    </Card>
  );
};

export default KeyPointsCard;
