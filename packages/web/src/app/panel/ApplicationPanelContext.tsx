/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";

const ApplicationPanelContext = React.createContext({
  setApplicationDisplayName: () => {
    console.error("How did we get here?");
  },
  setOnBackButton: () => {
    console.error("How did we get here?");
  },
  setControls: () => {
    console.error("How did we get here?");
  },
  setApplicationIcon: () => {
    console.error("How did we get here?");
  },
  setShowBackButton: () => {
    console.error("How did we get here?");
  },
} as {
  setShowBackButton: (value: boolean) => void;
  setOnBackButton: (cb: () => void) => void;
  setControls: (controls: React.ReactNode) => void;
  setApplicationDisplayName: (displayName: string) => void;
  setApplicationIcon: (displayName: string) => void;
});

export default ApplicationPanelContext;
