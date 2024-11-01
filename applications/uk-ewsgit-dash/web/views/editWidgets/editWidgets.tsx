/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Button from "@yourdash/uikit/src/components/button/button.tsx";
import Heading from "@yourdash/uikit/src/components/heading/heading.tsx";

const EditWidgets: React.FC = () => {
  return (
    <div>
      <Heading text="Edit widgets" />
      <Button
        text="Edit"
        onClick={() => {
          console.log("Edit widgets dialog");
        }}
      />
    </div>
  );
};

export default EditWidgets;
