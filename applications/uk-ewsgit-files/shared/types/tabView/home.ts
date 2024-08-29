/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

export interface IHomeRecentFile {
  // timestamp of last access
  timeStamp: number;
  // file's displayName
  fileName: string;
  // file's path
  filePath: string;
  // file's thumbnail as an authenticated image or undefined if no thumbnail exists
  thumbnail?: string;
}

export interface IHomeConnection {
  // the service's name
  serviceName: string;
  // service's logo as an authenticated image or undefined if no logo exists
  serviceLogo?: string;
  // the max & usage of the user's quota for the service along with the unit, undefined if no quota is provided
  quota: { max: number; usage: number; unit: string };
  // a description of the service, could be undefined if no description is provided
  description?: string;
  // a URL to link to the service's website, could be undefined if not provided or required
  url?: string;
  // id for the connection
  id: string;
}

export interface IHomeSharedFile {
  // the username of the file's owner
  owner: string;
  // the file's collaborators' usernames & avatar
  collaborators: string[];
  // the shared file's name
  fileName: string;
  // the shared file's path
  filePath: string;
  // the shared file's description, could be undefined if no description is provided
  description?: string;
  // the shared file's thumbnail as an authenticated image or undefined if no thumbnail exists
  thumbnail?: string;
}
