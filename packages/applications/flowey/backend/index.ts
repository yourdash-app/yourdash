/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";

const floweyBackend: YourDashApplicationServerPlugin = ( { exp, APPLICATION_ID } ) => {
  exp.get( `/app/${APPLICATION_ID}/`, ( req, res ) => {
    return res.json( { applicationName: APPLICATION_ID } )
  } )
}

export default floweyBackend;