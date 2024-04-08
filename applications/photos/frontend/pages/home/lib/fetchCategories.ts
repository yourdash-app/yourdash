/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";

export default function fetchCategories() {
  return new Promise<string[]>((resolve) => {
    csi.getJson(
      "/app/photos/albums",
      (data) => {
        resolve(data);
      },
      (err) => {
        resolve([]);
        console.log("Error fetching albums: ", err);
      },
    );
  });
}
