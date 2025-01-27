/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

type EndpointHomeApplicationCategories = {
  // the applicationCategoryId
  id: string;
  // the applicationCategory displayName
  displayName: string;
  // the applicationCategory css background image
  backgroundImage: string;
  // the applicationCategory description
  description: string;
  // the category application count
  applicationCount: number;
  // the category module count
  moduleCount: number;
}[];

export default EndpointHomeApplicationCategories;
