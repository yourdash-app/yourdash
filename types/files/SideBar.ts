export interface SideBarCategory {
  title: string,
  children: {
    title: string,
    path: string
  }[]
}