export interface ISettingsInstalledApplicationModule {
  type: "backend" | "frontend" | "officialFrontend";
}

export default interface ISettingsInstalledApplication {
  id: string;
  modules: {
    loaded: ISettingsInstalledApplicationModule[];
    unloaded: ISettingsInstalledApplicationModule[];
    length: number;
  };
}
