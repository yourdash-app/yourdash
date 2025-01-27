/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import { useNavigate } from "react-router";
import UKCard from "../card/UKCard.tsx";
import UKText from "../text/UKText.tsx";

const UKRedirect: FC<{ to: string | null }> = (props) => {
  const navigate = useNavigate();

  if (props.to !== null) navigate(props.to);

  return (
    <UKCard>
      <UKText text={`Redirecting to ${props.to}`} />
    </UKCard>
  );
};

export default UKRedirect;
