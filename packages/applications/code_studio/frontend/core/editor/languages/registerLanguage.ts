/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioLanguage from "./language";
import CodeStudioLanguages from "./languages";

export default async function registerLanguage(
  languageName: (typeof CodeStudioLanguages)[keyof typeof CodeStudioLanguages]["language"],
): Promise<CodeStudioLanguage | null> {
  try {
    // noinspection JSPotentiallyInvalidConstructorUsage
    return new (await import("./" + languageName + "/language.js")).default();
  } catch (e) {
    return null;
  }
}
