/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express";
import path from "path";
import authenticatedImage, { authenticatedImageType } from "../authenticatedImage.js";
import YourDashUser from "../core/user/index.js";

export default function defineUserEndpoints( exp: ExpressApplication ) {
  exp.get( "/core/user/current/avatar/large", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUser( username )
    const avatarPath = path.join( unreadUser.path, "avatars/large_avatar.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, authenticatedImageType.FILE, avatarPath ) )
  } )
  
  exp.get( "/core/user/current/avatar/medium", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUser( username )
    const avatarPath = path.join( unreadUser.path, "avatars/medium_avatar.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, authenticatedImageType.FILE, avatarPath ) )
  } )
  
  exp.get( "/core/user/current/avatar/small", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUser( username )
    const avatarPath = path.join( unreadUser.path, "avatars/small_avatar.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, authenticatedImageType.FILE, avatarPath ) )
  } )
  
  exp.get( "/core/user/current/avatar/original", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUser( username )
    const avatarPath = path.join( unreadUser.path, "avatars/original.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, authenticatedImageType.FILE, avatarPath ) )
  } )
}
