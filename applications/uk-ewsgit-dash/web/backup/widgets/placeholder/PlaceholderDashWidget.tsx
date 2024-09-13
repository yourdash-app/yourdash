/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import { Card } from "@yourdash/web/src/ui/index";

const PlaceholderDashWidget: React.FC = () => {
  return (
    <Card
      showBorder
      className={"flex items-center justify-center"}
    >
      Failed to load widget
    </Card>
  );
};

export default PlaceholderDashWidget;
