/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import loadable from "@loadable/component"
import { YourDashIcon } from "./components/icon/iconDictionary"

const Badge = loadable( () => import( "./components/badge/Badge" ) )
const Button = loadable( () => import( "./components/button/Button" ) )
const MajorButton = loadable( () => import( "./components/majorButton/MajorButton" ) )
const Card = loadable( () => import( "./components/card/Card" ) )
const DateInput = loadable( () => import( "./components/dateInput/DateInput" ) )
const Carousel = loadable( () => import( "./components/carousel/Carousel" ) )
const Chip = loadable( () => import( "./components/chip/Chip" ) )
const Column = loadable( () => import( "./components/column/Column" ) )
const Dialog = loadable( () => import( "./components/dialog/Dialog" ) )
const DropdownButton = loadable( () => import( "./components/dropdownButton/DropdownButton" ) )
const DropdownContainer = loadable( () => import( "./components/dropdownContainer/DropdownContainer" ) )
const DropdownIconButton = loadable( () => import( "./components/dropdownIconButton/DropdownIconButton" ) )
const NumberInput = loadable( () => import( "./components/numberInput/NumberInput" ) )
const Icon = loadable( () => import( "./components/icon/Icon" ) )
const IconButton = loadable( () => import( "./components/iconButton/IconButton" ) )
const ProgressBar = loadable( () => import( "./components/progressBar/ProgressBar" ) )
const RightClickMenu = loadable( () => import( "./components/rightClickMenu/RightClickMenu" ) )
const Row = loadable( () => import( "./components/row/Row" ) )
const SegmentButton = loadable( () => import( "./components/segmentButton/SegmentButton" ) )
const SideBar = loadable( () => import( "./components/sideBar/SideBar" ) )
const Spinner = loadable( () => import( "./components/spinner/Spinner" ) )
const Tags = loadable( () => import( "./components/tags/Tags" ) )
const TextBox = loadable( () => import( "./components/textBox/TextBox" ) )
const TextInput = loadable( () => import( "./components/textInput/TextInput" ) )
const ToggleSwitch = loadable( () => import( "./components/toggleSwitch/ToggleSwitch" ) )
const ResizeContainer = loadable( () => import( "./components/resizeContainer/ResizeContainer" ) )

export {
  Badge,
  Button,
  MajorButton,
  Card,
  DateInput,
  Carousel,
  Chip,
  Column,
  Dialog,
  DropdownButton,
  DropdownContainer,
  DropdownIconButton,
  NumberInput,
  Icon,
  IconButton,
  ProgressBar,
  RightClickMenu,
  Row,
  SegmentButton,
  SideBar,
  Spinner,
  Tags,
  TextBox,
  TextInput,
  ToggleSwitch,
  ResizeContainer,
  YourDashIcon
}