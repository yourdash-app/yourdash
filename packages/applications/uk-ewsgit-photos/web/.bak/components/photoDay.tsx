/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card.js";
import Icon from "@yourdash/chiplet/components/icon/Icon.js";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary.js";
import React, { useState } from "react";

const PhotoDay: React.FC<{
  photoCategory: {
    date: string;
    photos: string[];
  };
}> = ({ photoCategory }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div
      key={photoCategory.date}
      className={"flex flex-col gap-1"}
    >
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
          icon={isOpen ? UKIcon.ChevronDown : UKIcon.ChevronUp}
          className={"h-5"}
          color={"rgb(var(--button-fg))"}
        />
      </button>
      {isOpen && (
        <Card>
          {photoCategory.photos.map((photo) => (
            <img
              src={photo}
              key={photo}
              alt={""}
            />
          ))}
        </Card>
      )}
    </div>
  );
};

export default PhotoDay;
