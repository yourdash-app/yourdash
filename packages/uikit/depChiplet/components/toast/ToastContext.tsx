/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import IToast from "./IToast";

export type IToastContext = ( props: IToast ) => void

export default React.createContext(  ( ()=> { /* empty function */ } ) as IToastContext )
