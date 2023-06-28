import React, {useEffect, useState} from "react";
import {TextBox, IconButton, TextInput} from "../../../../ui";

export interface IdbItem {
  item: {
    key: string,
    content: string
  },
  setItemData: (key: string, content: string) => void
}

const DbItem: React.FC<IdbItem> = ({
  item,
  setItemData
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setKey(item.key);
    setContent(item.content);
  }, [item]);

  useEffect(() => {
    if (key === "" || content === "") {
      return;
    }

    try {
      JSON.parse(content);
    } catch (_err) {
      return;
    }

    setItemData(key, content);
  }, [key, content]);

  return (
    <div className={"bg-container-secondary-bg text-container-secondary-fg flex gap-4 p-2 rounded-xl"}>
      <IconButton
        icon={
          active
            ? "chevron-up-16"
            : "chevron-down-16"
        }
        onClick={() => setActive(!active)}
        className={"flex-shrink-0"}
      />
      {
        active
          ? (
            <TextInput
              onChange={(value: string) => {
                setKey(value);
              }}
              defaultValue={key}
              className={"mt-auto mb-auto flex-shrink-0"}
            />
          )
          : <span className={"mt-auto mb-auto"}>{key}</span>
      }
      {
        active && (
          <TextBox
            className={"flex flex-shrink"}
            defaultValue={content}
            onChange={e => {
              setContent(e.currentTarget.value);
            }}
          />
        )
      }
    </div>
  );
};

export default DbItem;
