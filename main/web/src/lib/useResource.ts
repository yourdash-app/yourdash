/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";
import useFirstRender from "./useFirstRender.js";

export default function useResource<T>(resource: () => Promise<T>, deps: never[] = [], sendInitialRequest = true) {
  const [data, setData] = useState<T | null>(null);
  const isInitial = useFirstRender();

  useEffect(() => {
    if (sendInitialRequest) {
      resource().then((d) => setData(d));
    } else if (!isInitial) {
      resource().then((d) => setData(d));
    }
  }, deps);

  return data;
}
