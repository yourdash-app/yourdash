/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

interface UIKitThemeLevel {
  fg: string,
  bg: string,
  border: string,
  shadow: string,
  accent: string,
  radius: string,
  font: {
    family: string
    size: string
    weight: string
  }
  header: {
    fg: string,
    size: string,
    font: {
      family: string
      size: string
      weight: string
    },
    padding: {
      vertical: string
      horizontal: string
    }
  }
  button: {
    fg: string,
    bg: string,
    border: string,
    font: {
      family: string
      size: string
      weight: string
    }
    radius: string
    shadow: string
    accent: string
    padding: {
      vertical: string
      horizontal: string
    }
  }
}

export interface UIKitTheme {
  default: Required<UIKitThemeLevel>
  level: {
    0: UIKitThemeLevel,
    1: UIKitThemeLevel,
    2: UIKitThemeLevel
  },
  name: string,
  author: string,
  version: string
}

export default const defaultTheme: UIKitTheme = {

}
