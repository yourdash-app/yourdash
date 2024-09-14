/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKIcon } from "../icon/iconDictionary.ts";

export default interface IToastAction {
  label: string;
  icon?: UKIcon;
  onClick: () => void;
}
