/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHTMLElement from "../htmlElement.js";
import { ContainerComponent, ContainerComponentInternals } from "./containerComponent.js";
import { SoloComponent, SoloComponentInternals } from "./soloComponent.js";

export type AnyComponent = SoloComponent | ContainerComponent;
export type AnyComponentOrHTMLElement = AnyComponent | UKHTMLElement;
export type AnyComponentInternals = SoloComponentInternals | ContainerComponentInternals;
