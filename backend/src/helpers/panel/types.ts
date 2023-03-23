export interface PanelQuickShortcut {
  name: string,
  icon: string,
  url: string
}

export interface PanelLauncherApplication {
  name: string,
  displayName: string,
  icon: string,
  description: string,
  underDevelopment?: boolean
}
