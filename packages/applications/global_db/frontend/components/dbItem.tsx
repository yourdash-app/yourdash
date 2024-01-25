/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import { TextBox, IconButton, TextInput, Card } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface IdbItem {
  currentItem: {
    key: string;
    content: string;
  };
  setCurrentItemData: (key: string, content: string) => void;
  items: { [key: string]: string };
  setItems: (items: { [key: string]: string }) => void;
}

const DbItem: React.FC<IdbItem> = ({
  currentItem,
  setCurrentItemData,
  items,
  setItems,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setKey(currentItem.key);
    setContent(currentItem.content);
  }, [currentItem]);

  return (
    <Card
      showBorder
      className={"bg-container-bg text-container-fg flex gap-2 !p-2 rounded-xl"}
    >
      {active ? (
        <>
          <div className={"flex flex-col gap-2 mb-auto"}>
            <TextInput
              accessibleName={"Item Name"}
              onBlur={(e) => {
                setKey(e.currentTarget.value);
              }}
              onChange={(value: string) => {
                setKey(value);
              }}
              defaultValue={key}
              className={"flex-shrink-0"}
            />
            <div className={"flex flex-row gap-2 w-full child:flex-grow"}>
              <IconButton
                icon={YourDashIcon.X}
                onClick={() => setActive(false)}
                className={"flex-shrink-0"}
              />
              <IconButton
                icon={YourDashIcon.Check}
                onClick={() => {
                  if (key === "" || content === "") {
                    return;
                  }

                  try {
                    JSON.parse(content);
                  } catch (_err) {
                    return;
                  }

                  if (key !== currentItem.key) {
                    // remove key from items
                    const newItems = items;
                    delete newItems[currentItem.key];

                    setItems(newItems);
                  }

                  setCurrentItemData(key, content);
                  setActive(false);
                }}
                className={"flex-shrink-0"}
              />
              <IconButton
                icon={YourDashIcon.Trash}
                onClick={() => {
                  // remove key from items
                  const newItems = items;
                  delete newItems[key];

                  setItems(newItems);
                }}
                className={"flex-shrink-0"}
              />
            </div>
          </div>
          <TextBox
            className={"flex flex-shrink h-full !min-h-[5rem] !max-h-max"}
            defaultValue={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />
        </>
      ) : (
        <>
          <div className={"flex flex-col gap-2"}>
            <IconButton
              icon={active ? YourDashIcon.ChevronUp : YourDashIcon.ChevronDown}
              onClick={() => setActive(!active)}
              className={"flex-shrink-0"}
            />
          </div>
          <span className={"mt-auto mb-auto"}>{key}</span>
        </>
      )}
    </Card>
  );
};

export default DbItem;
