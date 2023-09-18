/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */
 
// For CSS imports
declare module "*.module.css" {
  const content: { [className: string]: string };
  export default content;
}

// For SCSS imports
declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

// For image imports
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.avif" {
  const value: string;
  export default value;
}

// For CSS imports
declare module "*.css" {
  const value: string;
  export default value;
}

// For SCSS imports
declare module "*.scss" {
  const value: string;
  export default value;
}

// For JSON imports
declare module "*.json" {
  const content: {[className: string]: string};
  export default content;
}