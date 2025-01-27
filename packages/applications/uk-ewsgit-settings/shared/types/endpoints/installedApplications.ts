import ISettingsInstalledApplication from "../installedApplication.js";

export default interface IEndpointSettingsInstalledApplications {
  applications: {
    loaded: ISettingsInstalledApplication[];
    unloaded: ISettingsInstalledApplication[];
    length: number;
  };
}
