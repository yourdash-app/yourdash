/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "../core.js";
import YourDashService from "./service.js";
import YourDashServiceStartupType from "./serviceStartupType.js";
import { Constructor } from "type-fest/source/basic.js";

export default class YourDashCoreServiceManager {
  // map of services and their IDs
  activeServices: Map<string, YourDashService>;
  // arrays of registered service's IDs with their paths
  registeredServices: {
    // run before core initialization, no access to any core methods
    preinit: YourDashService[];
    // run before authentication middleware but with access to all core methods
    preauth: YourDashService[];
    // default for services, runs after authentication middleware and has access to all core methods
    default: YourDashService[];
  };

  constructor() {
    this.activeServices = new Map();
    this.registeredServices = {
      preinit: [],
      preauth: [],
      default: [],
    };
  }

  // if false, service dependsOn is invalid and the service should not be loaded
  private checkServiceDependsOn(service: YourDashService): boolean {
    const dependsOn = service.__serviceInternals.dependsOn;

    const depCheck = dependsOn.map((dep) => {
      if (!this.activeServices.has(dep)) {
        throw new Error(`Service ${service.__serviceInternals.id} depends on ${dep} which does not exist or is not yet registered.`);
      }

      const registeredDep = this.activeServices.get(dep);

      if (registeredDep.__serviceInternals.dependsOn.includes(service.__serviceInternals.id)) {
        throw new Error(`Service ${service.__serviceInternals.id} depends on ${dep} which is a circular dependency.`);
      }

      return true;
    });

    return depCheck.find((x) => !x);
  }

  // returns `true` if service was successfully registered or `false` if it was not
  async registerService(servicePath: string) {
    try {
      const importedService = (await import(servicePath))?.default as Constructor<YourDashService> | unknown;

      if (importedService instanceof YourDashService) {
        // @ts-ignore
        const service = new importedService();

        switch (service.__serviceInternals.startupType) {
          case YourDashServiceStartupType.preinit:
            this.registeredServices.preinit.push(service.__serviceInternals.id);
            break;
          case YourDashServiceStartupType.preauth:
            this.registeredServices.preauth.push(service.__serviceInternals.id);
            break;
          case YourDashServiceStartupType.default:
            this.registeredServices.default.push(service.__serviceInternals.id);
            break;
          default:
            throw new Error(`Invalid startup type for service: ${service.__serviceInternals.id}`);
        }

        return true;
      }
    } catch (err) {
      core.log.error(`Failed to register service: ${servicePath}`, err);

      return false;
    }
  }

  // load the registered services for a startup type
  loadRegisteredServices(event: YourDashServiceStartupType) {
    this.registeredServices[event].forEach((service: YourDashService) => {
      this.activeServices.set(service.__serviceInternals.id, service);
      service.onInit();
    });

    return this;
  }

  unloadRegisteredService(serviceId: string) {
    const service = this.activeServices.get(serviceId);

    if (service) {
      service.onUnload();
      this.activeServices.delete(serviceId);
    }

    return this;
  }
}
