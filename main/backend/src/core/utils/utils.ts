/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { CoreApi } from "../coreApi.js";
import CoreApiUtilsImage from "./image.js";

export default class CoreApiUtils {
  private readonly coreApi: CoreApi

  readonly image: ( val: string | Buffer ) => CoreApiUtilsImage

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi

    this.image = ( val: string | Buffer ) => new CoreApiUtilsImage( val )

    return this
  }
}
