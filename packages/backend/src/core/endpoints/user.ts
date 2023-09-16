/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express";
import path from "path";
import authenticatedImage, { AUTHENTICATED_IMAGE_TYPE } from "../authenticatedImage.js";
import YourDashUnreadUser from "../user/user.js";

export default function defineUserEndpoints( exp: ExpressApplication ) {
  exp.get( "/core/user/current/avatar/large", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUnreadUser( username )
    const avatarPath = path.join( unreadUser.getPath(), "large_avatar.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath ) )
  } )
  
  exp.get( "/core/user/current/avatar/medium", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUnreadUser( username )
    const avatarPath = path.join( unreadUser.getPath(), "medium_avatar.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath ) )
  } )
  
  exp.get( "/core/user/current/avatar/small", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUnreadUser( username )
    const avatarPath = path.join( unreadUser.getPath(), "small_avatar.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath ) )
  } )
  
  exp.get( "/core/user/current/avatar/original", ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    const unreadUser = new YourDashUnreadUser( username )
    const avatarPath = path.join( unreadUser.getPath(), "avatar.avif" )
    
    return res.status( 200 ).type( "text/plain" ).send( authenticatedImage( username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath ) )
  } )
}