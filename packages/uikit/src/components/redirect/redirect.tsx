/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import { useNavigate } from "react-router";
import Card from "../card/card.tsx";
import Text from "../text/text.tsx";

const Redirect: FC<{ to: string | null }> = (props) => {
  const navigate = useNavigate();

  if (props.to !== null) navigate(props.to);

  return (
    <Card>
      <Text text={`Redirecting to ${props.to}`} />
    </Card>
  );
};

export default Redirect;
