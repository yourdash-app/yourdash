/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Application as ExpressApplication } from "express";

import log from "backend/src/helpers/log.js";
import YourDashPanel from "backend/src/helpers/panel.js";
import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import YourDashUnreadUser from "backend/src/helpers/user.js";
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

    const psa = new PersonalServerAcceleratorCommunication( username, user.getSession( parseInt( sessionId, 10 ) ) );

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
