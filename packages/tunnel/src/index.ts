/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

function getText() {}

class Tunnel {
  baseUrl: string;
  constructor() {
    this.baseUrl = "";
    return this;
  }

  __internal_connectTo(instanceUrl: string) {
    this.baseUrl = instanceUrl;
    return this;
  }
}

const tun = new Tunnel();

export default tun;
