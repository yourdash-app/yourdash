/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import initEngine from "opengfx"
import loadObject from "../../../../core/object/loadObject.ts";

// @ts-ignore
const engine = await initEngine( document.body as HTMLDivElement )

await loadObject( "/boeing/boeing_787.obj?raw", engine.screen, engine )

// engine.setScene( new Scene( { id: "default_scene", objects: [] }, engine.screen ) )
