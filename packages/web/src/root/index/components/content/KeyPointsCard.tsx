/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/uikit/components/button/button.tsx";
import Card from "@yourdash/uikit/components/card/card.tsx";
import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";

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
      <Heading
        level={2}
        text={title}
        className={"!text-4xl font-semibold !text-start font-semibold pt-4"}
      />
      <Text
        className={"text-start"}
        text={content}
      />
    </Card>
  );
};

export default KeyPointsCard;
