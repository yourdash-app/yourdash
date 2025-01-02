/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKIconType } from "../iconDictionary.ts";

export default interface IToastAction {
  label: string;
  icon?: UKIconType;
  onClick: () => void;
}
