export default interface InstalledApplication {
  name: string,
  moduleRequirements: string[],
  icon: {
    store: string,
    quickShortcut: string,
    launcher: string
  },
  author: string,
  copyright: string,
  description: string,
  displayName: string,
  previewImages: string[],
  path: `/app/${string}`,
}