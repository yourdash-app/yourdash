export type EndpointCorePanelQuickShortcuts = {
    name: string, // TODO: rename to displayName
    module: { id: string, moduleType: "frontend" | "officialFrontend" },
    icon: string,
    url: string
}[]