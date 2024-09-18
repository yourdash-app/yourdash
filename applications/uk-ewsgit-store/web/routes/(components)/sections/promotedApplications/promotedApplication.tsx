/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";
// not a string
import { EndpointStoreHomePromotedApplications } from "../../../../../shared/types/endpoints/home/promotedApplications.ts";

const PromotedApplications: React.FC<{ application: EndpointStoreHomePromotedApplications[number] }> = ({ application }) => {
  console.log(application);

  return (
    <div>
      <Heading text={application.displayName} />
      <Text text={application.description} />
      <Text text={application.developer} />
      <div>
        {application.tags.map((tag) => (
          <div>
            <Text text={tag} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotedApplications;
