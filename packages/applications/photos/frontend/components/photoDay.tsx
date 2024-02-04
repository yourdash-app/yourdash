/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import { Card, Icon } from "@yourdash/web-client/src/ui";
import { YourDashIcon } from "@yourdash/web-client/src/ui/components/icon/iconDictionary";

const PhotoDay: React.FC<{
  photoCategory: {
    date: string;
    photos: string[];
  };
}> = ({ photoCategory }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div key={photoCategory.date} className={"flex flex-col gap-1"}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type={"button"}
        className={
          "text-left border-b-[1px] border-b-container-border pt-2.5 pb-0.5 pl-2 ml-2.5 mr-2.5 flex justify-between text-xl !bg-transparent"
        }
      >
        <h3>{photoCategory.date}</h3>
        <Icon
          icon={isOpen ? YourDashIcon.ChevronDown : YourDashIcon.ChevronUp}
          className={"h-5"}
          color={"rgb(var(--button-fg))"}
        />
      </button>
      {isOpen && (
        <Card>
          {photoCategory.photos.map((photo) => (
            <img src={photo} key={photo} alt={""} />
          ))}
        </Card>
      )}
    </div>
  );
};

export default PhotoDay;
