/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

interface ILocationAutocompleteSuggestion {
  id: string,
  address: {
    name?: string;
    admin1?: string;
    country?: string;
  }
}

export { type ILocationAutocompleteSuggestion }