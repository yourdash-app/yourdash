/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import FILES_VIEW_TYPE from "./viewType";

export interface IFilesView {
  type: FILES_VIEW_TYPE;
  options: { zoom: number };
}
