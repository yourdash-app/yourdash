/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Engine } from "../index.ts";
import Screen from "../screen.ts";
import LoadObj from "./format/obj.ts";

export default async function loadObject( objectData: string, screen: Screen, engine: Engine ) {
  const loader = new LoadObj( screen, engine );
  
  await loader.load( objectData );
}
