/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Module, { YourDashModuleArguments } from "backend/src/core/moduleManager/module.js";

export default class CodeStudioModule extends Module {
  constructor( args: YourDashModuleArguments ) {
    super( args );

    this.API.request.get( "/app/code_studio/", ( req, res ) => res.json( { success: true } ) );
  }
}
