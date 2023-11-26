/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Module, { YourDashModuleArguments } from "packages/backend/src/core/moduleManager/module.js";

export default class FloweyModule extends Module {
  constructor( args: YourDashModuleArguments ) {
    super( args );
  }
}
