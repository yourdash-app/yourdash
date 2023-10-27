/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Fragment } from "react";
import {
  Category,
  Component,
  Variant,
  Palette
} from "@react-buddy/ide-toolbox";

export function ExampleLoaderComponent() {
  return (
    <Fragment>Loading...</Fragment>
  );
}

export const PaletteTree = () => (
  <Palette>
    <Category name="App">
      <Component name="Loader">
        <Variant>
          <ExampleLoaderComponent />
        </Variant>
      </Component>
    </Category>
  </Palette>
);
