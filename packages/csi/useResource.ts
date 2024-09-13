/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";

export default function useResource<T>(resource: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setData(null);
    resource().then((d) => {
      setData(d);
    });
  }, deps);

  return data;
}
