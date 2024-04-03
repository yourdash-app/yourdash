/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import { useEffect } from "react";
import * as React from "react";
import CodeStudioEditor from "@yourdash/applications/code_studio/frontend/core/editor/editor";
import csi from "@yourdash/csi/csi";
import pathBrowserify from "path-browserify";
import CodeStudioLanguage from "../../../../code_studio/frontend/core/editor/languages/language";
import CodeStudioLanguages from "../../../../code_studio/frontend/core/editor/languages/languages";

export interface ITextPreview {
  path: string;
}

const TextPreview: React.FC<ITextPreview> = ({ path = "" }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [fileParser, setFileParser] = React.useState<CodeStudioLanguage | null>(null);

  useEffect(() => {
    CodeStudioLanguages[pathBrowserify.extname(path).replace(".", "")].parser.then((lang) => {
      setFileParser(lang);
    });
  }, []);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const editor = new CodeStudioEditor(ref.current);

    // @ts-ignore
    csi.postText("/app/files/get/file", { path }, (resp) => {
      const content = resp;

      // TODO: render the response
    });
  }, [!!ref.current, path]);

  return (
    <section className={"flex flex-col gap-2"}>
      <div className={"flex gap-1"}>
        <IconButton
          icon={UKIcon.ArrowSwitch}
          onClick={() => {
            // TODO: fixme
          }}
        />
      </div>
      <div data-yourdash-codestudio-editor="true" className={"overflow-auto w-full p-2"} ref={ref} />
    </section>
  );
};

export default TextPreview;
