/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

/**
 * # The YourDash project
 *  - https://github.com/yourdash/yourdash
 *  - https://yourdash.ewsgit.uk
 *  - https://ydsh.pages.dev
 */

class YourDashBackend {
  constructor() {
    return this;
  }
}

const backend = new YourDashBackend();

export { backend };

try {
  // Start the YourDash Instance
  backend.__internal__startInstance();
} catch (err) {
  backend.log.error("core", `An error occurred with YourDash startup: ${err}`);
}
