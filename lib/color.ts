/*
 * Created on Fri Oct 21 2022
 *
 * Copyright © 2022 Ewsgit
 */

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBCompact = `rgb(${number},${number},${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type RGBACompact = `rgba(${number},${number},${number},${number})`;
export type HEX = `#${string}`;

type COLOR = RGB | RGBA | HEX | RGBACompact | RGBCompact;

export default COLOR;