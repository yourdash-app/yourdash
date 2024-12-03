/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKIconType } from "../../components/icon/iconDictionary.ts";

export default interface IToastAction {
  label: string;
  icon?: UKIconType;
  onClick: () => void;
}
