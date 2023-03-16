interface SideBarCategory {
  title: string,
  children: {
    title: string,
    path: string
  }[]
}

export { type SideBarCategory }