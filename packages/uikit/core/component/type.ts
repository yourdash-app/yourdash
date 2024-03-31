/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLElement from "../htmlElement.js";
import { ContainerComponent, ContainerComponentInternals } from "./containerComponent.js";
import { SoloComponent, SoloComponentInternals } from "./soloComponent.js";

export type AnyComponent = SoloComponent | ContainerComponent;
export type AnyComponentOrHTMLElement = AnyComponent | UIKitHTMLElement;
export type AnyComponentInternals = SoloComponentInternals | ContainerComponentInternals;
