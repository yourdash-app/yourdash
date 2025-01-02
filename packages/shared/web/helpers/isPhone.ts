/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

interface NavigatorExtended extends Navigator {
  userAgentData?: {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
  };
}

export default function isMobileDevice(): boolean {
  const nav: NavigatorExtended = window.navigator;

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("ukmobile")) return true;

  // Check if UA Client Hints are supported
  if (nav?.userAgentData) {
    return nav.userAgentData.mobile || false;
  } else {
    const mobileDeviceRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    // Check if UA matches the regex of mobile devices
    // noinspection PlatformDetectionJS
    return navigator.userAgent.match(mobileDeviceRegex) !== null;
  }
}
