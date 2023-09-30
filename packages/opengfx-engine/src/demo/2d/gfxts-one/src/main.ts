/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Engine from "opengfx"
import GFXBox from "../../../../core/object/2d/box.ts";
import Scene from "../../../../core/scene/scene"

const engine = new Engine( document.body as HTMLDivElement )

const box = new GFXBox()

engine.setScene( new Scene( { id: "default_scene", objects: [box] } ) )

box.setPosition( 50, 50 )
box.render( engine.screen )
