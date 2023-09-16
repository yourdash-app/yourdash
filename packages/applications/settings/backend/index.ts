/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashPanel from "backend/src/core/panel.js";
import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import YourDashUnreadUser from "backend/src/core/user/user.js";
import { PersonalServerAcceleratorCommunication } from "backend/src/helpers/personalServerAccelerator.js";

const main: YourDashApplicationServerPlugin = ( {
  exp,
  io
} ) => {
  exp.post( "/app/settings/core/panel/position", ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    const { position } = req.body;

    const panel = new YourDashPanel( username );

    panel.setPanelPosition( position );

    return res.json( {
      success: true
    } );
  } );

  exp.post( "/app/settings/core/panel/quick-shortcuts", ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    const { launcher } = req.body;

    const panel = new YourDashPanel( username );

    panel.setLauncherType( launcher );

    return res.json( { success: true } );
  } );

  exp.get( "/app/settings/debug/psa/update/:sessionId", async ( req, res ) => {
    const { sessionId } = req.params;
    const { username } = req.headers as {
      username: string
    };
    const user = await ( new YourDashUnreadUser( username ).read() );

    const psa = new PersonalServerAcceleratorCommunication(
      username,
      user.getSession( parseInt( sessionId, 10 ) )
    );

    if ( !psa.socketConnection ) {
      return res.json( { success: false } );
    }

    psa.emit( "/core/update", true );

    return res.json( {
      success: true,
      data: user.getSession( parseInt( sessionId, 10 ) )
    } );
  } );
};

export default main;
