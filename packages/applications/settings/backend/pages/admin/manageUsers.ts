/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YOURDASH_USER_PERMISSIONS } from "backend/src/core/user/permissions.js";
import Module from "backend/src/core/moduleManager/module.js";
import coreApi from "backend/src/core/coreApi.js";

export default function manageUsers( api: Module["API"] ) {
  api.request.use( `/app/${api.applicationName}/admin/manage-users`, async ( req, res, next ) => {
    const user = api.getUser( req );

    if ( await user.hasPermission( YOURDASH_USER_PERMISSIONS.Administrator ) ) {
      return next()
    }

    return res.json( {
      error: true,
      message: "Unauthorized request"
    } )
  } )

  api.request.post( `/app/${api.applicationName}/admin/manage-users/users`, async ( req, res ) => {
    return res.json( {
      users: await coreApi.users.getAllUsers()
    } )
  } )
}
