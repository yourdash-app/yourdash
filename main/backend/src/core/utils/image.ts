/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import sharp, { Sharp } from "sharp";
import coreApi from "../coreApi.js";
import { AUTHENTICATED_IMAGE_TYPE } from "../coreApiAuthenticatedImage.js";

export default class CoreApiUtilsImage {
  sharpInstance: Sharp

  constructor( imageDataOrUrl: string | Buffer ) {
    this.sharpInstance = sharp( imageDataOrUrl )

    return this;
  }

  resizeTo( width: number, height: number ) {
    this.sharpInstance.resize( width, height )

    return this
  }

  async toBuffer() {
    return await this.sharpInstance.toBuffer()
  }

  async toFile( path: string ) {
    return await this.sharpInstance.toFile( path )
  }

  async toJpeg( options?: { quality?: number } ) {
    return await this.sharpInstance.jpeg( { ...options } ).toBuffer()
  }

  async toPng() {
    return await this.sharpInstance.png().toBuffer()
  }

  async toAvif() {
    return await this.sharpInstance.avif().toBuffer()
  }

  async makeAuthenticated( username: string ) {
    const buf = await this.sharpInstance.toBuffer()
    coreApi.authenticatedImage.create( username, AUTHENTICATED_IMAGE_TYPE.BUFFER, buf )

    return this
  }
}
