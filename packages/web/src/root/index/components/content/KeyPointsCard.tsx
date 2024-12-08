/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKC } from "@yourdash/uikit";

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
    <UKC.Card
      actions={
        <>
          <UKC.Button
            onClick={action.onClick}
            text={action.label}
          />
        </>
      }
    >
      <UKC.Heading
        level={2}
        text={title}
        className={"!text-4xl font-semibold !text-start pt-4"}
      />
      <UKC.Text
        className={"text-start"}
        text={content}
      />
    </UKC.Card>
  );
};

export default KeyPointsCard;
