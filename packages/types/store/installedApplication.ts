interface InstalledApplication {
  name: string,
  moduleRequirements: string[],
  icon: string,
  author: string,
  copyright: string,
  description: string,
  displayName: string,
  previewImages: string[],
  path: `/app/${string}`,
  category: string,
  underDevelopment?: boolean;
  license: string
}

export type { InstalledApplication }
