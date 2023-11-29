/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Button, Card } from "../../../../ui/index";

interface IKeyPointsCard {
  title: string,
  content: string,
  action: {
    label: string, onClick(): void
  },
  spanTwoColumns?: boolean
}

const KeyPointsCard: React.FC<IKeyPointsCard> = ( {
  title,
  content,
  action
} ) => {
  return <Card
    showBorder={ true }
    className={ "flex flex-col lg:justify-between items-center gap-4 w-full animate__animated animate__fadeIn animate__1500ms animate__slow overflow-hidden" }
  >
    <h3 className={ "text-4xl text-center font-semibold" }>
      { title }
    </h3>
    <div className={ "flex items-center gap-4 flex-col" }>
      <span className={ "text-2xl text-center" }>
        { content }
      </span>
      <Button
        onClick={ action.onClick }
      >
        { action.label }
      </Button>
    </div>
  </Card>;
};

export default KeyPointsCard;
