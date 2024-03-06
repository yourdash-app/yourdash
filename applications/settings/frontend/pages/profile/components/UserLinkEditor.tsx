/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import Row from "@yourdash/uikit/depChiplet/components/row/Row";
import TextInput from "@yourdash/uikit/depChiplet/components/textInput/TextInput";

const UserLinkEditor: React.FC<{
  link: { url: string; label: string };
  links: { url: string; label: string }[];
  setLinks: (links: { url: string; label: string }[]) => void;
}> = ({ link, links, setLinks }) => {
  return (
    <Row className={"child:flex-grow"} key={link.url + link.label}>
      <TextInput
        onChange={(value) => {
          link.label = value;
          setLinks(links);
        }}
        defaultValue={link.label}
        label={"Label"}
        accessibleName={"Label"}
      />
      <TextInput
        onChange={(value) => {
          link.url = value;
          setLinks(links);
        }}
        defaultValue={link.url}
        label={"Url"}
        accessibleName={"Url"}
      />
      <IconButton
        className={"aspect-square"}
        icon={YourDashIcon.Dash}
        onClick={() => {
          setLinks(links?.filter((l) => l !== link));
        }}
      />
    </Row>
  );
};

export default UserLinkEditor;
