/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import loadable from "@loadable/component"
import { YourDashIcon } from "./components/icon/iconDictionary"

export { YourDashIcon }
export const Badge = loadable( () => import( "./components/badge/Badge" ) )
export const Button = loadable( () => import( "./components/button/Button" ) )
export const Card = loadable( () => import( "./components/card/Card" ) )
export const Carousel = loadable( () => import( "./components/carousel/Carousel" ) )
export const Chip = loadable( () => import( "./components/chip/Chip" ) )
export const Column = loadable( () => import( "./components/column/Column" ) )
export const DateInput = loadable( () => import( "./components/dateInput/DateInput" ) )
export const Dialog = loadable( () => import( "./components/dialog/Dialog" ) )
export const DropdownButton = loadable( () => import( "./components/dropdownButton/DropdownButton" ) )
export const DropdownContainer = loadable( () => import( "./components/dropdownContainer/DropdownContainer" ) )
export const DropdownIconButton = loadable( () => import( "./components/dropdownIconButton/DropdownIconButton" ) )
export const Heading = loadable( () => import( "./components/heading/Heading" ) )
export const Icon = loadable( () => import( "./components/icon/Icon" ) )
export const IconButton = loadable( () => import( "./components/iconButton/IconButton" ) )
export const MajorButton = loadable( () => import( "./components/majorButton/MajorButton" ) )
export const NumberInput = loadable( () => import( "./components/numberInput/NumberInput" ) )
export const ProgressBar = loadable( () => import( "./components/progressBar/ProgressBar" ) )
export const ResizeContainer = loadable( () => import( "./components/resizeContainer/ResizeContainer" ) )
export const RightClickMenu = loadable( () => import( "./components/rightClickMenu/RightClickMenu" ) )
export const Row = loadable( () => import( "./components/row/Row" ) )
export const SegmentButton = loadable( () => import( "./components/segmentButton/SegmentButton" ) )
export const SideBar = loadable( () => import( "./components/sideBar/SideBar" ) )
export const Slides = loadable( () => import( "./components/slides/Slides" ) )
export const Spinner = loadable( () => import( "./components/spinner/Spinner" ) )
export const Tags = loadable( () => import( "./components/tags/Tags" ) )
export const TextBox = loadable( () => import( "./components/textBox/TextBox" ) )
export const TextInput = loadable( () => import( "./components/textInput/TextInput" ) )
export const ToggleSwitch = loadable( () => import( "./components/toggleSwitch/ToggleSwitch" ) )
