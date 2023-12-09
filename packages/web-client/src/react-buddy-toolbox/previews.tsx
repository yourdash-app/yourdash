/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import Page from "../root/login/Page";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={ <PaletteTree /> }>
      <ComponentPreview path="/Page">
        <Page />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
