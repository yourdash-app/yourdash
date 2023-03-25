interface InstalledApplicationList {
  name: string,
  icon: {
    store: string
  },
  description: string,
  displayName: string,
  path: `/app/${string}`,
}

export type {InstalledApplicationList}