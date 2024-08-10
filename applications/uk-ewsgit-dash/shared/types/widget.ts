/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

// eslint-disable-next-line
export interface IWidget<WidgetType extends string, Data extends { [key: string]: any }> {
  position: { x: number; y: number };
  id: WidgetType;
  size: {
    preferred: { width: number; height: number };
    min: { width: number; height: number };
    max: { width: number; height: number };
  };
  data: Data;
}
