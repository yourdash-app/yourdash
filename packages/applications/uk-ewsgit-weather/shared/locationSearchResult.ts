/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

interface ILocationSearchResult {
  id: string,
  address: {
    name?: string;
    admin1?: string;
    country?: string;
  },
  latitude: number,
  longitude: number
}

export { type ILocationSearchResult }
